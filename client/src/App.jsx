import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import HomePage from "./views/public/HomePage.jsx";
import './components/testComponents/LoginTest.jsx'
//import LoginTest from "./components/testComponents/LoginTest.jsx";
function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}
export default App