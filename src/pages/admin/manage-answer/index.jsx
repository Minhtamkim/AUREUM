import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createAnswer, deleteAnswer, getAnswers, updateAnswer } from "../../../services/api.answer";

function ManageAnswer() {
  const [searchText, setSearchText] = useState(""); // Lưu từ khóa tìm kiếm
  const [filteredAnswers, setFilteredAnswers] = useState([]); // Lưu danh sách danh mục sau khi lọc
  const [answers, setAnswers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = useForm();

  const fetchAnswers = async () => {
    const data = await getAnswers();
    setAnswers(data);
    setFilteredAnswers(data); // Sao chép danh sách gốc để lọc
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Answer",
      dataIndex: "answerText",
      key: "answerText",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, record) => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                form.setFieldsValue({
                  ...record, // chấm hỏi ? đằng sau chữ "record?" là để không hiện bảng báo lỗi (tránh crack webweb)
                  //lệnh kiểm tra (?. là optional chaining). Nếu record.categories tồn tại,
                  // nó sẽ lấy tất cả các id từ danh sách categories của record và
                  // lưu vào trường categoryID. Nếu không có categories, nó sẽ gán
                  // một mảng rỗng ([]). Việc sử dụng optional chaining giúp tránh
                  // lỗi khi record.categories không tồn tại.
                  // BrandID: record?.brands ? record?.brands?.map((item) => item.id) : [],
                });
              }}
            >
              Edit
            </Button>

            <Popconfirm
              title="Delete the answer!"
              description="Are you sure want to delete the answer ?"
              onConfirm={() => handleDelete(id)}
            >
              <Button danger type="primary">
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Loại bỏ dấu
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const normalizedValue = removeDiacritics(value.toLowerCase()); // Chuẩn hóa từ khóa tìm kiếm

    const filtered = answers.filter((answer) => removeDiacritics(answer.name.toLowerCase()).includes(normalizedValue));

    setFilteredAnswers(filtered);
  };

  const handleDelete = async (id) => {
    // Gọi API xóa sản phẩm
    const response = await deleteAnswer(id);
    // Sau khi xóa thành công, cập nhật lại danh sách sản phẩm
    if (response) {
      fetchAnswers();
    }
  };

  const handleSubmit = async (formValues) => {
    if (formValues.id) {
      const response = await updateAnswer({ id: formValues.id, brand: formValues });
      console.log(response);
      toast.success("Successfully update answer!");
    }

    // khong co id thi la create
    else {
      const response = await createAnswer(formValues);
      console.log(response);
      toast.success("Successfully create new answer!");
    }

    setOpen(false);
    form.resetFields();
    fetchAnswers();
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Create New Answer
      </Button>
      <Input
        placeholder="Tìm kiếm Câu Trả Lời..."
        allowClear
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, width: 250, marginLeft: 12 }}
      />

      <Table dataSource={filteredAnswers.filter((answer) => !answer.deleted)} columns={columns} rowKey="id" />
      <Modal title="Create New Answer" open={open} onCancel={() => setOpen(false)} onOk={() => form.submit()}>
        <Form labelCol={{ span: 24 }} form={form} onFinish={handleSubmit}>
          <Form.Item label="Id" name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Answer"
            name="answerText"
            rules={[
              {
                required: true,
                message: "Answer can not be empty!",
              },
              {
                min: 3,
                message: "Answer must be at least 3 characters!",
              },
            ]}
          >
            <Input placeholder="Nhập Câu Trả Lời...." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageAnswer;
