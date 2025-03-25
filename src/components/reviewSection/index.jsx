/* eslint-disable react/prop-types */
import { Image } from "antd";
import { FaShieldAlt } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";

const ReviewSection = ({ ratings }) => {
  if (!ratings || ratings.length === 0) {
    return (
      <div className="w-full p-6 mt-8">
        {/* Tiêu đề và tổng điểm đánh giá */}
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">ĐÁNH GIÁ CỦA KHÁCH HÀNG</h2>
          <span className="text-yellow-500 font-bold text-lg">0</span>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <MdStarRate key={index} className="text-gray-400 text-lg" />
            ))}
          </div>
          <span className="text-gray-500 text-sm">0 Đánh giá</span>
        </div>

        {/* Thông báo chưa có đánh giá */}
        <div className="flex justify-center mt-6">
          <p className="text-lg font-semibold text-black">Chưa có đánh giá</p>
        </div>
      </div>
    );
  }

  // Tính điểm trung bình
  const averageRating = (
    ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
  ).toFixed(1);

  const ratingCounts = [0, 0, 0, 0, 0];
  ratings.forEach((review) => {
    ratingCounts[review.rating - 1]++;
  });

  return (
    <div className="p-6 mt-8">
      <h2 className="text-2xl font-bold">Đánh giá từ khách hàng</h2>
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          {/* Điểm trung bình */}
          <span className="text-6xl font-bold">{averageRating}</span>

          {/* Biểu tượng trái tim thay vì sao */}
          <div className="ml-4 flex text-red-500">
            {[...Array(5)].map((_, index) => (
              <MdStarRate
                key={index}
                className={`text-2xl ${
                  index < Math.round(averageRating)
                    ? "text-red-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Tổng số đánh giá */}
          <span className="ml-2 text-gray-600">
            ({ratings.length} đánh giá)
          </span>

          <div className="flex items-center ml-15">
            {/* Biểu đồ số lượng đánh giá */}
            <div className="mt-6">
              {[5, 4, 3, 2, 1].map((stars, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex text-red-500">
                    {[...Array(5)].map((_, i) => (
                      <MdStarRate
                        key={i}
                        className={`text-lg ${
                          i < stars ? "text-red-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="ml-2 w-40 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-brown rounded-full"
                      style={{
                        width: `${
                          (ratingCounts[stars - 1] / ratings.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="ml-2">{ratingCounts[stars - 1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {ratings.map((review, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-start"
          >
            {/* Thông tin người dùng và đánh giá */}
            <div>
              <div className="flex ">
                <h4 className="font-bold text-lg">{review.account.fullName}</h4>
                <div className="flex items-center ml-2">
                  {[...Array(5)].map((_, i) => (
                    <MdStarRate
                      key={i}
                      className={`text-${
                        i < review.rating ? "yellow-400" : "gray-300"
                      } text-lg`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <FaShieldAlt className="text-orange-500 mr-1" />
                <span className="text-orange-500 font-semibold">
                  Đã mua hàng
                </span>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
              <Image src=""></Image>
            </div>

            {/* Ngày đánh giá */}
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
