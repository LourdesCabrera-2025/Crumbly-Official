import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import HomePage from "./views/public/HomePage.jsx";
import AuthStatusView from "./views/public/test/AccessTest.jsx";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/access-test" element={<AuthStatusView />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
