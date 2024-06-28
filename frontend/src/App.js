import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import AddRoom from "./components/owner/AddRoom";
import AddProperty from "./components/owner/AddProperty";
import Property from "./components/owner/Property";
import RoomDetails from "./components/user/RoomDetails";
import UpdateProperty from "./components/owner/UpdateProperty";
import UpdateRoom from "./components/owner/UpdateRoom";
import MyBookings from "./components/user/MyBookings";
import { Toaster } from "react-hot-toast";
import Profile from "./components/layouts/Profile";

function App() {
  return (
    <div className="bg-black w-full min-h-screen overflow-hidden">
      <Router>
        {/* Toaster config for showing toasts */}
        <Toaster
          toastOptions={{ style: { background: "#363636", color: "#fff" } }}
        />
        {/* ----------- Guest Routes ------------ */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/roomdetails/:id" element={<RoomDetails />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* ----------- Owner Routes --------------- */}
        <Routes>
          <Route path="/property" element={<Property />} />
          <Route path="/add/property" element={<AddProperty />} />
          <Route path="/update/property/:id" element={<UpdateProperty />} />
          <Route path="/addroom/:id" element={<AddRoom />} />
          <Route path="/update/room/:id" element={<UpdateRoom />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
