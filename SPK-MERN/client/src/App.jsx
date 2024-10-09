import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/Login";
import Home from "./components/pages/Home";
import AddRelawan from "./components/fragment/Relawan/AddRelawan";
import EditRelawan from "./components/fragment/Relawan/EditRelawan";
import Kriteria from "./components/pages/Kriteria";
import AddKriteria from "./components/fragment/Kriteria/AddKriteria";
import EditKriteria from "./components/fragment/Kriteria/EditKriteria";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="home" element={<Home />} />
          <Route path="/home/add" element={<AddRelawan/>} />
          <Route path="/home/edit/:id" element={<EditRelawan/>} />
          <Route path="/kriteria" element={<Kriteria/>}/>
          <Route path="/kriteria/add" element={<AddKriteria/>}/>
          <Route path="/kriteria/edit/:id_kriteria" element={<EditKriteria/>} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;