import Home from './Pages/Home/Home'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import FlightBooking from './Pages/FlightBooking';
import Layout from './Components/Layout/Layout';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import PasswordReset from './Pages/Auth/Reset_password';
import AboutUs from './Pages/AboutUs';
import EngageUs from './Pages/EngageUs';
import OurBlog from './Pages/OurBlog';
import MagicalKenya from './Pages/MagicalKenya';
import TravelAccessories from './Pages/TravelAccessories';
import Profile from './Pages/Profile';



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/FlightBooking" element={<FlightBooking />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset_password" element={<PasswordReset />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/engage" element={<EngageUs />} />
          <Route path="/blog" element={<OurBlog />} />
          <Route path="/magical-kenya" element={<MagicalKenya />} />
          <Route path="/accessories" element={<TravelAccessories />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
