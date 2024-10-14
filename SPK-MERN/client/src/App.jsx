import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/Login";
import Home from "./components/pages/Home";
import AddRelawan from "./components/fragment/Relawan/AddRelawan";
import EditRelawan from "./components/fragment/Relawan/EditRelawan";
import Kriteria from "./components/pages/Kriteria";
import AddKriteria from "./components/fragment/Kriteria/AddKriteria";
import EditKriteria from "./components/fragment/Kriteria/EditKriteria";
import Penilaian from './components/pages/Penilaian';
import AddPenilaian from './components/fragment/Penilaian/AddPenilaian'
import EditPenilaian from "./components/fragment/Penilaian/EditPenilaian";
import HasilHitung from './components/pages/Perhitungan'
import RangkingPage from "./components/pages/RangkingPage";


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
          <Route path="/penilaian" element={<Penilaian/>}/>
          <Route path="/penilaian/:id" element={<AddPenilaian/>}/>
          {/* <Route path="/penilaian/:id_kriteria" element={<EditPenilaian/>}/> */}
          <Route path="/perhitungan" element={<HasilHitung/>}/>
          <Route path="/rangking" element={<RangkingPage/>}/>

          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;