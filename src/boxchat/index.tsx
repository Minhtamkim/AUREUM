import React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  Container,
  TextField,
  IconButton,
  Paper,
  Typography,
  Avatar,
  AppBar,
  Toolbar,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import { VscChromeMinimize } from "react-icons/vsc";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatMessage {
  text: string;
  isBot: boolean;
}

// const generateBotResponse = async (history: ChatMessage[]): Promise<Message | null> => {
//   const roleContext = `You are a knowledgeable skincare and beauty e-commerce assistant. Your expertise includes:
//     - Skincare products and ingredients
//     - Skin types and concerns
//     - Product recommendations
//     - Beauty routines and regimens
//     - Order status and shipping information
//     - Returns and refunds
//     - Product availability and pricing
//     - Skincare tips and best practices

//     Always provide accurate, helpful information and maintain a professional yet friendly tone.
//     When recommending products, use the information from our product catalog.
//     If a product is not in stock, inform the customer and suggest alternatives.`;
//   const contents = [
//     {
//       role: "user",
//       parts: [{ text: roleContext }],
//     },
//     ...history.map((msg) => ({
//       role: msg.isBot ? "model" : "user",
//       parts: [{ text: msg.text }],
//     })),
//   ];

//   const requestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ contents }),
//   };

//   try {
//     const response = await fetch(
//       "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBG6YIbg_bZJCsonRSBfmGdT8jt7aay788",
//       requestOptions
//     );
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.error?.message || "Something went wrong!");

//     if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
//       return {
//         text: data.candidates[0].content.parts[0].text,
//         isBot: true,
//         timestamp: new Date(),
//       };
//     }
//     return null;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

const generateBotResponse = async (history: ChatMessage[]): Promise<Message | null> => {
  const roleContext = `Chào mừng bạn đến với cửa hàng mỹ phẩm trực tuyến của chúng tôi! Tôi là trợ lý ảo chuyên về chăm sóc da và làm đẹp. Tôi có thể giúp bạn:
    - Tìm kiếm thông tin sản phẩm
    - Số điện thoại liên hệ của website là : 0768838547
    - Tư vấn về các vấn đề da và loại da
    - Đề xuất các sản phẩm phù hợp
    - Hướng dẫn các bước chăm sóc da
    - Giải đáp các thắc mắc về giá cả và tình trạng sản phẩm
    - Chia sẻ các mẹo và bí quyết chăm sóc da hiệu quả

    Luôn cung cấp thông tin chính xác, hữu ích và giữ thái độ chuyên nghiệp nhưng thân thiện.
    Khi đề xuất sản phẩm, hãy sử dụng thông tin từ danh mục sản phẩm của chúng tôi.
    Nếu sản phẩm hết hàng, hãy thông báo cho khách hàng và đề xuất các sản phẩm thay thế.


    Product Catalog:
    ${JSON.stringify([
      {
        name: "Sữa rửa mặt Tẩy tế bào chết Obagi Clenziderm M.D. Foaming Blemish",
        price: 1139000,
        description:
          "Sữa rửa mặt 7 trong 1 Obagi Clenziderm M.D. Foaming Blemish cho làn da dầu mụn. Với công thức cải tiến chứa 2% Salicylic Acid (BHA) được kiểm nghiệm lâm sàng, sản phẩm giúp làm sạch lỗ chân lông, loại bỏ tế bào chết và mang lại 7 lợi ích chính chăm sóc toàn diện, cho làn da khoẻ mạnh và mịn màng.",
      },
      {
        name: "Nước Hoa HồngToner Cân Bằng pH Trên Da Obagi Nu-Derm 2",
        price: 1020000 + "\\n",
        description:
          "Nước Hoa Hồng Toner Không Cồn Cân Bằng pH Chiết Xuất Cây Phỉ & Lô Hội Obagi Nu-Derm \\n Là một bước thiết yếu trong chu trình chăm sóc da hàng ngày, Toner Obagi Nu-Derm là loại toner không cồn, giải pháp tối ưu giúp duy trì độ pH tự nhiên cho làn da của bạn. Loại bỏ bụi bẩn và tế bào chết, tạo tiền đề giúp các bước chăm sóc phía sau được thẩm thấu vào da tốt hơn.",
      },
      {
        name: "Kem Chống Nắng Phổ Rộng Obagi Sun Shield Matte Broad Spectrum SPF50",
        price: 950000,
        description:
          "Kem chống nắng Obagi Sun Shield Matte Broad Spectrum SPF 50 giúp bảo vệ da khỏi tia UVB và UVA, khi thoa trên da tạo lớp nền mỏng nhẹ, không gây bít tắc lỗ chân lông, không gây mụn và đã được kiểm nghiệm bởi chuyên gia da liễu. Phù hợp cho mọi loại da.",
      },
      {
        name: "Lotion Tẩy Tế Bào Chết Chứa AHA - Obagi Nu-Derm Fx Exfoderm Forte",
        price: 1950000,
        description:
          "Lotion Tẩy Da Chết Cho Da Dầu Chứa AHA Obagi Nu-Derm Exfoderm Forte. Obagi Nu-Derm Exfoderm Forte là kem tẩy da chết được thiết kế riêng dành cho da dầu",
      },
    ])}`;

  const contents = [
    {
      role: "user",
      parts: [{ text: roleContext }],
    },
    ...history.map((msg) => ({
      role: msg.isBot ? "model" : "user",
      parts: [{ text: msg.text }],
    })),
  ];

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contents }),
  };

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBG6YIbg_bZJCsonRSBfmGdT8jt7aay788", // Replace with your API key
      requestOptions
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Something went wrong!");

    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return {
        text: data.candidates[0].content.parts[0].text,
        isBot: true,
        timestamp: new Date(),
      };
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

function BotChat() {
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [iconShow, setIconShow] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const welcomeMessage: Message = {
      text: `Chào mừng ${user?.fullName} đến với Aureum cửa hàng mỹ phẩm trực tuyến của chúng tôi! Tôi là AI Đẹp trai có thể giúp gì cho bạn? `,
      isBot: true,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    const botResponse = await generateBotResponse([...messages, newMessage]);
    if (botResponse) {
      setMessages((prev) => [...prev, botResponse]);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setIconShow(!iconShow);
  };

  return (
    <div className="">
      <CssBaseline />
      {isChatOpen && (
        <Box
          sx={{
            background: "white",
            position: "fixed",
            bottom: "50%",
            right: 20,
            transform: "translateY(80%)",
            width: 380,
            height: "60vh",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <AppBar position="static" sx={{ height: "60px" }}>
            <Toolbar sx={{ minHeight: "30px", alignItems: "center", bgcolor: "#2d2d2b" }}>
              {" "}
              {/* Căn giữa nội dung */}
              <SmartToyIcon sx={{ mr: 2, fontSize: "1.2rem", bgcolor: "#2d2d2b" }} />
              <Typography
                sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                variant="body1"
                component="div"
              >
                ChatBot
                <VscChromeMinimize onClick={toggleChat} style={{ cursor: "pointer" }} />
              </Typography>
            </Toolbar>
          </AppBar>

          <Container maxWidth="md" sx={{ height: "50vh", flex: 1, py: 2, display: "flex", flexDirection: "column" }}>
            <Paper
              elevation={3}
              sx={{
                background: "white",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                mb: 2,
                backgroundColor: "white",
              }}
            >
              <Box
                sx={{
                  height: "calc(50vh - 40px)",
                  overflow: "auto",
                  p: 2,
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#f1f1f1",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#888",
                    borderRadius: "4px",
                    "&:hover": {
                      background: "#555",
                    },
                  },
                }}
              >
                {messages.map((message, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: message.isBot ? "flex-start" : "flex-end",
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      {message.isBot && (
                        <Avatar sx={{ mr: 1, bgcolor: "#2d2d2b", width: "24px", height: "24px" }}>
                          <SmartToyIcon sx={{ fontSize: "1.2rem" }} />
                        </Avatar>
                      )}
                      <Paper
                        elevation={1}
                        sx={{
                          p: 1,
                          backgroundColor: message.isBot ? "grey.100" : "primary.main",
                          color: message.isBot ? "text.primary" : "white",
                          borderRadius: 2,
                          width: "100%",
                        }}
                      >
                        <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                          {message.text}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ display: "block", mt: 0.5, opacity: 0.7, fontSize: "0.8rem" }}
                        >
                          {message.timestamp.toLocaleTimeString()}
                        </Typography>
                      </Paper>
                      {!message.isBot && (
                        <Avatar sx={{ ml: 1, bgcolor: "#2d2d2b", width: "24px", height: "24px" }}>
                          <PersonIcon sx={{ fontSize: "1.2rem" }} />
                        </Avatar>
                      )}
                    </Box>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </Box>
            </Paper>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                multiline
                maxRows={4}
              />
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                sx={{
                  justifyContent: "center",
                  alignSelf: "flex-end",
                  backgroundColor: "#747272",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#747272",
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Container>
        </Box>
      )}

      <IconButton
        onClick={toggleChat}
        sx={{
          position: "fixed",
          bottom: "40%",
          right: 20,
          transform: "translateY(50%)",
          bgcolor: "#2d2d2b",
          color: "white",
          display: `${iconShow ? "in-line" : "none"}`,
          "&:hover": {
            backgroundColor: "#747272",
          },
        }}
      >
        <SmartToyIcon />
      </IconButton>
    </div>
  );
}
export default BotChat;
