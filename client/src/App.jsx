import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";

import HomePage from "./views/public/HomePage.jsx";
import CreateAccount from "./views/public/CreateAccount.jsx";
import LoginAccount from "./views/public/LoginAccount.jsx";
import DetailProduct from "./views/public/DetailProduct.jsx";
import Dashboard from "./views/private/Dashboard.jsx";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/loginAccount" element={<LoginAccount />}/>
          <Route path="/detailProduct" element={<DetailProduct/>} />
          <Route path="/private/Dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
