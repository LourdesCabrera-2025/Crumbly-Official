import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import AppRoutes from "./routes/index.jsx"

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
