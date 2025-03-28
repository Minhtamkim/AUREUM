/* eslint-disable react/prop-types */
import { PlusOutlined } from "@ant-design/icons";
import { Button, Image, Modal, Rate, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import uploadFile from "../../utils/upload";

function FeedbackPopup({ mode, visible, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [error, setError] = useState("");
  const [commentError, setCommentError] = useState("");

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Hình ảnh
      </div>
    </button>
  );

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleSubmit = async () => {
    let image = ""; // ko có ảnh string rỗng

    if (fileList.length > 0) {
      image = await uploadFile(fileList[0].originFileObj); // fileList lấy ảnh đầu tiền và chuyển string = base64
    }
    console.log(image);

    if (mode == "rating") {
      if (rating === 0) {
        setError("Hãy chọn số sao để gửi đánh giá!");
        return;
      }
      setError(""); // Xóa lỗi nếu đã chọn sao

      if (comment.length > 250) {
        setCommentError("Bình luận không được vượt quá 250 ký tự.");
        return;
      }
      setCommentError(""); // Xóa lỗi nếu bình luận hợp lệ
      onSubmit({ rating, comment, image });
    } else {
      onSubmit({ reason, description, image });
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <Modal
      title={mode == "rating" ? "Đánh giá sản phẩm" : "Báo cáo sản phẩm"}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button
          key="cancel"
          onClick={handleSubmit}
          style={{
            width: "100%",
            backgroundColor: "#1A1919",
            color: "#FFFFFF",
            fontWeight: "bold",
            padding: "14px 0",
            borderRadius: "8px",
            fontSize: "16px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            boxShadow: "none",
            border: "none",
          }}
        >
          Gửi
        </Button>,
      ]}
    >
      {mode == "rating" ? (
        <>
          <div>
            <Rate
              value={rating}
              onChange={(value) => {
                setRating(value);
                if (value > 0) setError(""); // Xóa lỗi ngay khi người dùng chọn sao
              }}
            />
            {error && <div style={{ color: "red", marginTop: 5 }}>{error}</div>}
          </div>
          <TextArea
            rows={4}
            placeholder="Nhập bình luận của bạn"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (e.target.value.length <= 250) setCommentError(""); // Xóa lỗi nếu bình luận hợp lệ
            }}
          />
          {commentError && (
            <div style={{ color: "red", marginTop: 5 }}>{commentError}</div>
          )}
        </>
      ) : (
        <>
          <Select
            style={{ width: "100%", marginBottom: 10 }}
            value={reason}
            onChange={setReason}
            placeholder="Lý do"
            options={[
              { value: "Spam", lable: "Spam" },
              { value: "Fake", lable: "Fake" },
              { value: "Khác", lable: "Khác" },
            ]}
          />
          <TextArea
            rows={4}
            placeholder="Mô tả chi tiết sản phẩm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </>
      )}
      <div className="mt-4">
        <Upload
          beforeUpload={() => false}
          lable="Image"
          name="image"
          fileList={fileList}
          listType="picture-card"
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </div>

      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </Modal>
  );
}

export default FeedbackPopup;
