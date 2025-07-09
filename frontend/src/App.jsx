import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Alumnos from "./pages/Alumnos";
import Cursos from "./pages/Cursos";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-6 px-4">
        <Routes>
          <Route path="/" element={<Navigate to="/alumnos" />} />
          <Route path="/alumnos" element={<Alumnos />} />
          <Route path="/cursos" element={<Cursos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
