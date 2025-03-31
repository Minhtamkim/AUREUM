let messageApi;

export const initMessageService = (api) => {
  messageApi = api;
};

export const showMessage = ({ content = "", type = "success", duration = 3 }) => {
  if (!messageApi) {
    console.error("Message service chưa được khởi tạo!");
    return;
  }
  messageApi.open({ type, content, duration });
};
export const showError = ({ content = "", type = "error", duration = 3 }) => {
  if (!messageApi) {
    console.error("Message service chưa được khởi tạo!");
    return;
  }
  messageApi.open({ type, content, duration });
};
