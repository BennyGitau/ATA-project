import Home from './Pages/Home/Home'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import FlightBooking from './Pages/FlightBooking';
import Layout from './Components/Layout/Layout';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import PasswordReset from './Pages/Auth/Reset_password';

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
        </Route>
      </Routes>
    </Router>
  )
}

export default App
