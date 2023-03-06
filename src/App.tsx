import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './global.css';
import { Checkout } from './pages/Checkout';
import { Home } from './pages/Home';
import { Success } from './pages/Success';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
