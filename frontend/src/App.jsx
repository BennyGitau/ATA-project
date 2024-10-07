import Home from './Pages/Home/Home'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import PasswordReset from './Pages/Auth/Reset_password';
import AboutUs from './Pages/AboutUs';
import EngageUs from './Pages/EngageUs';
import OurBlog from './Pages/OurBlog';
import MagicalKenya from './Pages/MagicalKenya';
import TravelAccessories from './Pages/TravelAccessories';
import Profile from './Pages/Profile';
import Bookings from './Pages/Bookings';
import Checkout from './Pages/Checkout';
import ConfirmBooking from './Pages/ConfirmBooking';



function App() {

  return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Bookings />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset_password" element={<PasswordReset />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/engage" element={<EngageUs />} />
          <Route path="/blog" element={<OurBlog />} />
          <Route path="/magical-kenya" element={<MagicalKenya />} />
          <Route path="/accessories" element={<TravelAccessories />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/booking" element={<ConfirmBooking />} />
      </Routes>
  )
}

export default App
