import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@Store";
import AppRoutes from "./Routes";
import { AuthInit } from "@Components";
import { useEffect } from "react";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthInit>
          <AppRoutes />
        </AuthInit>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
