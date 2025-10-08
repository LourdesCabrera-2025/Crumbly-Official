import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./views/public/HomePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Vista Publica */}

        <Route path="/" element={<HomePage/>}/>

        {/* Se puede añadir otras rutas publicas o privadas  */}
      </Routes>
    </BrowserRouter>
  )
}
export default App