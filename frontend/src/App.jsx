import Home from './Pages/Home'
import './App.css'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import FlightBooking from './Pages/FlightBooking';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FlightBooking" element={<FlightBooking />} />
      </Routes>
    </Router>
  )
}

export default App
