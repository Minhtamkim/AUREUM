// import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
// import TestComponent from "./pages/Test/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer />
      </PersistGate>
    </Provider>
  </>
);
