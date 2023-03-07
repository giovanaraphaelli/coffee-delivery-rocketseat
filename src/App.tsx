import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LayoutBase } from './components/LayoutBase';
import { CartProvider } from './context/CartContext';
import './global.css';
import { Checkout } from './pages/Checkout';
import { Home } from './pages/Home';
import { Success } from './pages/Success';

function App() {
  return (
    <Router>
      <CartProvider>
        <LayoutBase>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </LayoutBase>
      </CartProvider>
    </Router>
  );
}

export default App;
