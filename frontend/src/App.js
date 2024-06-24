import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Dashboard from "./components/owner/Dashboard";
import AddRoom from "./components/owner/AddRoom";
import AddProperty from "./components/owner/AddProperty";

function App() {
  return (
    <div className="bg-black w-screen h-screen">
      <Router>
        {/* ----------- Customer Routes ------------ */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* ----------- Owner Routes --------------- */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add/property" element={<AddProperty />} />
          <Route path="/add/room" element={<AddRoom />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
