import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

export default function App(){
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <BrowserRouter>
              <div style={{minHeight:'100vh', display:'flex', flexDirection:'column'}}>
                <Navbar/>
                <main style={{flex:1}}>
                  <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/shop" element={<Shop/>}/>
                    <Route path="/product/:id" element={<ProductDetails/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/favorites" element={<Favorites/>}/>
                    <Route path="*" element={<NotFound/>}/>
                  </Routes>
                </main>
                <Footer/>
              </div>
            </BrowserRouter>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  )
}
