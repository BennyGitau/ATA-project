import Home from './Pages/Home/Home'
import './App.css'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import FlightBooking from './Pages/FlightBooking';
import Layout from './Components/Layout/Layout';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/FlightBooking" element={<FlightBooking />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
