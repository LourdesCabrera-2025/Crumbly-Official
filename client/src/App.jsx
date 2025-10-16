import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import HomePage from "./views/public/HomePage.jsx";
function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}
export default App