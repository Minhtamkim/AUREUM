import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createQuestion, deleteQuestion, getQuestions, updateQuestion } from "../../../services/api.question";

function ManageQuestion() {
  const [searchText, setSearchText] = useState(""); // Lưu từ khóa tìm kiếm
  const [filteredQuestions, setFilteredQuestions] = useState([]); // Lưu danh sách danh mục sau khi lọc
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = useForm();

  const fetchQuestions = async () => {
    const data = await getQuestions();
    setQuestions(data);
    setFilteredQuestions(data); // Sao chép danh sách gốc để lọc
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Question",
      dataIndex: "questionText",
      key: "questionText",
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
              title="Delete the question!"
              description="Are you sure want to delete the question ?"
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

    const filtered = questions.filter((question) =>
      removeDiacritics(question.name.toLowerCase()).includes(normalizedValue)
    );

    setFilteredQuestions(filtered);
  };

  const handleDelete = async (id) => {
    // Gọi API xóa sản phẩm
    const response = await deleteQuestion(id);
    // Sau khi xóa thành công, cập nhật lại danh sách sản phẩm
    if (response) {
      fetchQuestions();
    }
  };

  const handleSubmit = async (formValues) => {
    if (formValues.id) {
      const response = await updateQuestion({ id: formValues.id, brand: formValues });
      console.log(response);
      toast.success("Successfully update question!");
    }

    // khong co id thi la create
    else {
      const response = await createQuestion(formValues);
      console.log(response);
      toast.success("Successfully create new question!");
    }

    setOpen(false);
    form.resetFields();
    fetchQuestions();
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Create New Question
      </Button>
      <Input
        placeholder="Tìm kiếm Câu Hỏi..."
        allowClear
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, width: 250, marginLeft: 12 }}
      />

      <Table dataSource={filteredQuestions.filter((question) => !question.deleted)} columns={columns} rowKey="id" />
      <Modal title="Create New Question" open={open} onCancel={() => setOpen(false)} onOk={() => form.submit()}>
        <Form labelCol={{ span: 24 }} form={form} onFinish={handleSubmit}>
          <Form.Item label="Id" name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Question"
            name="questionText"
            rules={[
              {
                required: true,
                message: "Question can not be empty!",
              },
              {
                min: 3,
                message: "Question must be at least 3 characters!",
              },
            ]}
          >
            <Input placeholder="Nhập Câu Hỏi...." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageQuestion;
