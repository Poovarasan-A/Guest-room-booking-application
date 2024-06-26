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
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <div className="bg-black w-full overflow-hidden">
      <Router>
        {/* ----------- Customer Routes ------------ */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roomdetails/:id" element={<RoomDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* ----------- Owner Routes --------------- */}
        <Routes>
          <Route
            path="/property"
            element={
              <ProtectedRoute isOwner={true}>
                <Property />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add/property"
            element={
              <ProtectedRoute isOwner={true}>
                <AddProperty />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update/property/:id"
            element={
              <ProtectedRoute isOwner={true}>
                <UpdateProperty />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addroom/:id"
            element={
              <ProtectedRoute isOwner={true}>
                <AddRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update/room/:id"
            element={
              <ProtectedRoute isOwner={true}>
                <UpdateRoom />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
