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
          onClick={onClose}
          type="default"
          className="!bg-transparent !border-[#EDE0D4] !text-black px-4 py-2 rounded-md transition-all duration-300 
          hover:!bg-[#EDE0D4] hover:!text-black"
        >
          Hủy
        </Button>,
        <Button
          key="submit"
          onClick={handleSubmit}
          type="default"
          className={`!bg-transparent !border-[#EDE0D4] !text-black px-4 py-2 rounded-md transition-all duration-300 
          hover:!bg-[#EDE0D4] hover:!text-black 
          ${
            mode !== "rating" && !reason ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={mode !== "rating" && !reason}
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
            value={reason || undefined}
            onChange={setReason}
            placeholder="Chọn lý do"
            allowClear // Thêm nút xóa lựa chọn
            options={[
              { value: "Muốn thay đổi sản phẩm", lable: "Change product" },
              {
                value: "Muốn thay đổi Mã giảm giá",
                lable: "change the discount code",
              },
              {
                value: "Sản phẩm không phù hợp với loại da",
                lable: "The product is not suitable",
              },
              {
                value: "Đánh giá sản phẩm không tốt",
                lable: "Has poor ratings.",
              },
              { value: "Có Mã Giảm Giá Hấp Dẫn Hơn", lable: "A better promo" },
              {
                value: "Không có nhu cầu mua nữa",
                lable: "No longer need to purchase this",
              },
              {
                value: "Không thấy lí do hủy phù hợp",
                lable: "Can not find a suitable cancellation reason.",
              },
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
