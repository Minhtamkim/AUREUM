import { Button, Card, Col, Row, Select, Statistic } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import * as XLSX from "xlsx-js-style"; // Updated import
import { ArrowDownOutlined, ArrowUpOutlined, FileExcelOutlined } from "@ant-design/icons";

function ManageOverview() {
  const [overviewData, setOverviewData] = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [topSellingData, setTopSellingData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4567"];

  const transformTopSellingData = (apiData) => {
    return apiData.map(([product, soldQuantity]) => ({
      name: product.name,
      sales: soldQuantity,
    }));
  };

  // Fetch tổng quan
  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await api.get("dashboard/statistics");
        setOverviewData(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchOverview();
  }, []);

  // Fetch doanh thu
  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setRevenueData([]); // Reset trước khi fetch mới
        console.log(`Fetching revenue for year: ${selectedYear}`);
        const response = await api.get(`dashboard/admin/dashboard/revenue?year=${selectedYear}`, {
          headers: { Authorization: `Bearer YOUR_ACCESS_TOKEN` },
        });
        console.log("Revenue API Response:", response.data);
        const transformedData = transformRevenueData(response.data);
        console.log("Transformed Revenue Data:", transformedData);
        setRevenueData(transformedData.length > 0 ? transformedData : []);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };
    fetchRevenueData();
  }, [selectedYear]);

  const handleExport = () => {
    const workbook = XLSX.utils.book_new();
    let data = [];

    // 1. Thêm dữ liệu Tổng Quan (Tô màu vàng)
    data.push([
      { v: "Tổng Sản Phẩm", s: { fill: { fgColor: { rgb: "FFFF00" } }, font: { bold: true } } },
      overviewData?.totalProducts,
    ]);
    data.push([
      { v: "Tổng Khách Hàng", s: { fill: { fgColor: { rgb: "FFFF00" } }, font: { bold: true } } },
      overviewData?.totalCustomers,
    ]);
    data.push([
      { v: "Tổng Đơn Hàng", s: { fill: { fgColor: { rgb: "FFFF00" } }, font: { bold: true } } },
      overviewData?.totalOrders,
    ]);

    data.push([]); // Dòng trống

    // 2. Thêm tiêu đề Top 5 Sản Phẩm Bán Chạy (Tô màu xanh dương)
    data.push([
      {
        v: "Top 5 Sản Phẩm Bán Chạy",
        s: { fill: { fgColor: { rgb: "00BFFF" } }, font: { bold: true, color: { rgb: "FFFFFF" } } },
      },
    ]);
    data.push([
      {
        v: "Tên Sản Phẩm",
        s: { fill: { fgColor: { rgb: "00BFFF" } }, font: { bold: true, color: { rgb: "FFFFFF" } } },
      },
      {
        v: "Số Lượng Bán",
        s: { fill: { fgColor: { rgb: "00BFFF" } }, font: { bold: true, color: { rgb: "FFFFFF" } } },
      },
      { v: "Tỷ Lệ (%)", s: { fill: { fgColor: { rgb: "00BFFF" } }, font: { bold: true, color: { rgb: "FFFFFF" } } } },
    ]);

    topSellingData.forEach((item) => {
      data.push([item.name, item.sales, item.percentage]);
    });

    data.push([]); // Dòng trống

    // 3. Thêm tiêu đề Doanh Thu Theo Tháng (Tô màu cam)
    data.push([
      {
        v: "Doanh Thu Theo Tháng",
        s: { fill: { fgColor: { rgb: "FFA500" } }, font: { bold: true, color: { rgb: "FFFFFF" } } },
      },
    ]);
    data.push([
      { v: "Tháng", s: { fill: { fgColor: { rgb: "FFA500" } }, font: { bold: true, color: { rgb: "FFFFFF" } } } },
      {
        v: "Doanh Thu (VND)",
        s: { fill: { fgColor: { rgb: "FFA500" } }, font: { bold: true, color: { rgb: "FFFFFF" } } },
      },
    ]);

    revenueData.forEach((item) => {
      data.push([item.name, item.Revenue]);
    });

    // Tạo worksheet từ dữ liệu
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Áp dụng styles cho từng ô
    Object.keys(worksheet).forEach((cell) => {
      if (worksheet[cell].s) {
        worksheet[cell].s.alignment = { horizontal: "center", vertical: "center" }; // Căn giữa nội dung
      }
    });

    // Tự động điều chỉnh kích thước cột
    const columnWidths = data[0].map((_, colIndex) => ({
      wch: Math.max(...data.map((row) => (row[colIndex] ? row[colIndex].toString().length : 0)), 15),
    }));

    worksheet["!cols"] = columnWidths;

    // Thêm worksheet vào workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Thống Kê");

    // Xuất file Excel
    XLSX.writeFile(workbook, "ThongKe.xlsx");
  };

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        const response = await api.get("dashboard/top-selling-products", {
          headers: { Authorization: `Bearer YOUR_ACCESS_TOKEN` },
        });

        console.log("Raw API Data:", response.data); // Kiểm tra dữ liệu từ API

        const rawData = transformTopSellingData(response.data).slice(0, 5);
        console.log("Transformed Data:", rawData); // Kiểm tra dữ liệu sau khi xử lý

        const totalSales = rawData.reduce((sum, item) => sum + item.sales, 0);
        console.log("Total Sales:", totalSales); // Kiểm tra tổng số lượng

        if (totalSales === 0) {
          console.warn("No sales data available. PieChart will not render.");
          return; // Không cập nhật state nếu không có dữ liệu
        }

        const topSellingDataWithPercentage = rawData.map((item) => ({
          ...item,
          percentage: Number(((item.sales / totalSales) * 100).toFixed(2)), // Chuyển về number
        }));

        console.log("Final Data for PieChart:", topSellingDataWithPercentage);
        setTopSellingData(topSellingDataWithPercentage);
      } catch (error) {
        console.error("Error fetching top-selling products:", error);
      }
    };

    fetchTopSellingProducts();
  }, []);

  // Chuyển đổi dữ liệu revenue
  const transformRevenueData = (apiData) => {
    return apiData.map((item) => ({
      name: `Tháng ${item[0]}`, // Hiển thị tháng
      amt: item[1], // Tổng doanh thu
      Revenue: item[1], // Dữ liệu cho Bar
      uv: item[1], // Dữ liệu cho Line
    }));
  };

  const calculatePercentageChange = (current, previous) => {
    if (!previous) return 0; // Trường hợp tháng đầu tiên không có dữ liệu trước đó
    return ((current - previous) / previous) * 100;
  };

  const transformedRevenueData = revenueData.map((item, index, array) => {
    const previousRevenue = index > 0 ? array[index - 1].Revenue : null;
    const percentageChange = calculatePercentageChange(item.Revenue, previousRevenue);

    return {
      ...item,
      percentageChange: percentageChange.toFixed(2), // Giữ 2 số thập phân
    };
  });
  return (
    <div>
      <Button type="primary" icon={<FileExcelOutlined />} onClick={handleExport} style={{ marginBottom: 20 }}>
        Export Excel
      </Button>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Products"
              value={overviewData?.totalProducts}
              valueStyle={{ color: "#3f8600" }}
              suffix="Sản Phẩm"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Customers"
              value={overviewData?.totalCustomers}
              valueStyle={{ color: "#3f8600" }}
              suffix="Khách Hàng"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Orders"
              value={overviewData?.totalOrders}
              valueStyle={{ color: "#3f8600" }}
              suffix="Đơn Hàng"
            />
          </Card>
        </Col>
      </Row>
      {/* Biểu đồ PieChart */}
      <div>
        <h3 className="text-xl font-semibold mt-2">Top 5 Sản Phẩm Bán Chạy</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={topSellingData}
              dataKey="percentage"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ percent, midAngle, outerRadius, cx, cy }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius * 1.2; // Đẩy nhãn ra xa hơn để tránh trùng
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="black"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    fontSize={14}
                    fontWeight="bold"
                  >
                    {`${(percent * 100).toFixed(2)}%`}
                  </text>
                );
              }}
            >
              {topSellingData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={
                (value, name, props) => [`${props.payload.sales} đơn`, `Sản phẩm: ${props.payload.name}`] // Hiện số đơn khi hover
              }
            />
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </ResponsiveContainer>

        <h3 className="text-m  text-center">Biểu đồ thể hiện Top 5 Sản Phẩm Bán Chạy</h3>
      </div>
      {/* Biểu đồ ComposedChart */}
      <div>
        <Select value={selectedYear} onChange={setSelectedYear} style={{ width: 120, marginBottom: 20 }}>
          {[...Array(4)].map((_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <Select.Option key={year} value={year}>
                {year}
              </Select.Option>
            );
          })}
        </Select>
        <h3 className="text-lg font-semibold mt-2 mb-10">Biểu Đồ Doanh Thu</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart width={500} height={400} data={revenueData}>
            <XAxis dataKey="name" interval={0} />
            <YAxis domain={[0, "dataMax + 500000"]} />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Bar dataKey="Revenue" barSize={20} fill="#0088FE">
              <LabelList
                dataKey="Revenue"
                position="top"
                formatter={(value) => `${value.toLocaleString()} VND`}
                style={{ fontSize: 10 }}
              />
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
        <h3 className="text-m  text-center">Biểu đồ thể hiện doanh thu theo từng tháng trong năm</h3>
      </div>
      <div>
        <h3 className="text-lg font-semibold mt-2 mb-10">Bảng Thống Kê Doanh Thu</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 px-4 py-2">Tháng</th>
              <th className="border border-gray-300 px-4 py-2">Doanh Thu (VND)</th>
              <th className="border border-gray-300 px-4 py-2">Thay Đổi (%)</th>
            </tr>
          </thead>
          <tbody>
            {transformedRevenueData
              .filter((item) => item.percentageChange !== "0.00") // Ẩn các mục có thay đổi 0%
              .map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.Revenue.toLocaleString()} VND</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.percentageChange > 0 ? (
                      <span className="text-green-500">
                        <ArrowUpOutlined /> {item.percentageChange}%
                      </span>
                    ) : (
                      <span className="text-red-500">
                        <ArrowDownOutlined /> {Math.abs(item.percentageChange)}%
                      </span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageOverview;
