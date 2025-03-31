import { Button, Dropdown, Form, Input, Menu, Modal, Popconfirm, Select, Table, Tag } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { createAnswer, deleteAnswer, getAnswers, updateAnswer } from "../../../services/api.answer";
import { getQuestions } from "../../../services/api.question";
import { getSkinType } from "../../../services/api.skin";
import { CheckCircleOutlined, CloseCircleOutlined, EllipsisOutlined } from "@ant-design/icons";
import { showMessage } from "../../../utils/message";

function ManageAnswer() {
  const [searchText, setSearchText] = useState(""); // Lưu từ khóa tìm kiếm
  const [filteredAnswers, setFilteredAnswers] = useState([]); // Lưu danh sách danh mục sau khi lọc
  const [questions, setQuestions] = useState([]);
  const [skins, setSkins] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = useForm();

  const fetchAnswers = async () => {
    const data = await getAnswers();
    setAnswers(data);
    setFilteredAnswers(data); // Sao chép danh sách gốc để lọc
  };

  const fetchQuestions = async () => {
    const data = await getQuestions();
    setQuestions(data);
  };

  const fetchSkins = async () => {
    const data = await getSkinType();
    setSkins(data);
  };

  useEffect(() => {
    fetchAnswers();
    fetchQuestions();
    fetchSkins();
  }, []);

  const actionMenu = (id, record) => (
    <Menu>
      <Menu.Item
        key="1"
        type="primary"
        onClick={() => {
          setOpen(true);
          form.setFieldsValue({
            ...record,
            questionId: record?.question?.id, // Lấy ID question
            skinId: record?.skin?.id, // Lấy ID skin
          });
        }}
      >
        <Tag color="green" icon={<CheckCircleOutlined />}>
          Edit
        </Tag>
      </Menu.Item>
      <Menu.Item key="2">
        <Popconfirm
          title="Delete the product"
          description="Are you sure want to delete the product?"
          onConfirm={() => handleDelete(id)}
          okText="Yes"
          cancelText="No"
        >
          <Tag color="red" icon={<CloseCircleOutlined />} style={{ cursor: "pointer" }}>
            Delete
          </Tag>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => b.id - a.id,
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      render: (question) => question?.questionText,
    },
    {
      title: "Answer",
      dataIndex: "answerText",
      key: "answerText",
    },
    {
      title: "skin Type",
      dataIndex: "skin",
      key: "skin",
      render: (skin) => skin?.name,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, record) => {
        return (
          <Dropdown overlay={actionMenu(id, record)} trigger={["click"]}>
            <Button icon={<EllipsisOutlined />}></Button>
          </Dropdown>
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

    const filtered = answers.filter(
      (answer) =>
        removeDiacritics(answer.name.toLowerCase()).includes(normalizedValue) ||
        removeDiacritics(answer.question?.questionText.toLowerCase()).includes(normalizedValue) ||
        removeDiacritics(answer.skin?.name.toLowerCase()).includes(normalizedValue)
    );

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
      const response = await updateAnswer({ id: formValues.id, answer: formValues });
      console.log(response);
      showMessage({
        content: "Cập nhật câu trả lời thành công!",
      });
    }

    // khong co id thi la create
    else {
      const response = await createAnswer(formValues);
      console.log(response);
      showMessage({
        content: "Tạo mới câu trả lời thành công!",
      });
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
          form.resetFields(); // Reset form khi mở modal
        }}
      >
        Create New Answer
      </Button>
      <Input
        placeholder="Tìm kiếm câu trả lời theo name, question, skin..."
        allowClear
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, width: 350, marginLeft: 12 }}
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
          <Form.Item
            label="Question"
            name="questionId"
            rules={[
              {
                required: true,
                message: "One question must be selected!",
              },
            ]}
          >
            <Select
              placeholder="Chọn câu hỏi...."
              showSearch // Cho phép tìm kiếm
              optionFilterProp="children" // Lọc theo nội dung hiển thị
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())} // Hàm lọc danh sách theo input
            >
              {questions?.map((question) => (
                <Select.Option value={question.id} key={question.id}>
                  {question.questionText}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Skin Type"
            name="skinId"
            rules={[
              {
                required: true,
                message: "One skin type must be selected!",
              },
            ]}
          >
            <Select
              placeholder="Chọn loại da tương ứng với câu trả lời...."
              showSearch // Cho phép tìm kiếm
              optionFilterProp="children" // Lọc theo nội dung hiển thị
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())} // Hàm lọc danh sách theo input
            >
              {skins?.map((skin) => (
                <Select.Option value={skin.id} key={skin.id}>
                  {skin.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageAnswer;
