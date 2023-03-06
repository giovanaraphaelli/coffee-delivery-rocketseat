import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LayoutBase } from './components/LayoutBase';
import './global.css';
import { Checkout } from './pages/Checkout';
import { Home } from './pages/Home';
import { Success } from './pages/Success';

function App() {
  return (
    <Router>
      <LayoutBase>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </LayoutBase>
    </Router>
  );
}

export default App;
