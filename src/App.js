import Home from "./admin/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HocVien from "./admin/HocVien";
import Students from "./admin/Students";
import Diem from "./admin/Diem";
import Login from "./admin/Login";
import BaseForm from "./admin/BaseForm";
import Detail_Students from "./admin/Detail_Students";
import HomePage from "./client/HomePage";
import Register_Online from "./admin/Register_Online";
import Schedule from "./admin/Schedule";
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
        <Route path="/detail_student/:id" element={<Detail_Students />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/registeronline" element={<Register_Online />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </div>
  );
}

export default App;
