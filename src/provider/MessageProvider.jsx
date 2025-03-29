import React, { createContext, useContext } from "react";
import { message } from "antd";
import { initMessageService } from "../utils/message";

const MessageContext = createContext(null);

export const MessageProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  // Khởi tạo service khi component được mount
  initMessageService(messageApi);
  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};
