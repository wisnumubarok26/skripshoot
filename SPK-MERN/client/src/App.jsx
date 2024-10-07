import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/Login";
import Home from "./components/pages/Home";
import AddRelawan from "./components/fragment/Relawan/AddRelawan";
import EditRelawan from "./components/fragment/Relawan/EditRelawan";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="home" element={<Home />} />
          <Route path="/home/add" element={<AddRelawan/>} />
          <Route path="/home/edit/:id" element={<EditRelawan/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;