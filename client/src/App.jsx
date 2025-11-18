import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";

import HomePage from "./views/public/HomePage.jsx";
import CreateAccount from "./views/public/CreateAccount.jsx";
import LoginAccount from "./views/public/LoginAccount.jsx";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/loginAccount" element={<LoginAccount />}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
