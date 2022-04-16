import Home from "./admin/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HocVien from "./admin/HocVien";
import Students from "./admin/Students";
import Diem from "./admin/Diem";
import Login from "./admin/Login";
import BaseForm from "./admin/BaseForm";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hocvien" element={<HocVien />} />
        <Route path="/students" element={<Students />} />
        <Route path="/diem" element={<Diem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<BaseForm />} />
      </Routes>
    </div>
  );
}

export default App;
