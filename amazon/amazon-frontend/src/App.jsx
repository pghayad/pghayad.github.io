import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';

const API_URL = 'http://localhost:5000';

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/products`).then(res => setProducts(res.data));
  }, []);

 return (
  <div className="product-grid">
    {products.map(p => (
      <div key={p.id} className="product-card">
        <img src={p.image} alt={p.name} className="product-image" />
        <h2>{p.name}</h2>
        <div className="rating-container">
          <Star className="star-icon" />
          <span>{p.rating}</span>
        </div>
        <p className="price-tag">${p.price}</p>
        <button onClick={() => onAddToCart(p)} className="btn-primary">
          Add to Cart
        </button>
      </div>
    ))}
  </div>
);
}

function Cart({ cartItems, onUpdateQuantity }) {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
  <div className="cart-container">
    <h1>Shopping Cart</h1>
    {cartItems.length === 0 ? <p>Your cart is empty.</p> : (
      <>
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div>
              <h3>{item.name}</h3>
              <p>${item.price} each</p>
            </div>
            <div className="quantity-control">
              <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="btn-qty">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="btn-qty">+</button>
            </div>
          </div>
        ))}
        <div className="cart-total">Total: ${total.toFixed(2)}</div>
      </>
    )}
  </div>
);
}

export default function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/cart`).then(res => setCart(res.data));
  }, []);

  const handleAddToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      axios.patch(`${API_URL}/cart/${existing.id}`, { quantity: existing.quantity + 1 })
        .then(() => setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      axios.post(`${API_URL}/cart`, { ...product, quantity: 1 })
        .then(res => setCart([...cart, res.data]));
    }
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      axios.delete(`${API_URL}/cart/${id}`).then(() => setCart(cart.filter(item => item.id !== id)));
    } else {
      axios.patch(`${API_URL}/cart/${id}`, { quantity })
        .then(() => setCart(cart.map(item => item.id === id ? { ...item, quantity } : item)));
    }
  };

 return (
  <BrowserRouter>
    <nav className="navbar">
      <Link to="/" className="logo">E-Commerce Application</Link>
      <Link to="/cart" className="cart-link">
        <ShoppingCart />
        <span className="cart-badge">
          {cart.reduce((acc, item) => acc + item.quantity, 0)}
        </span>
      </Link>
    </nav>
    
    <Routes>
      <Route path="/" element={<ProductList onAddToCart={handleAddToCart} />} />
      <Route path="/cart" element={<Cart cartItems={cart} onUpdateQuantity={handleUpdateQuantity} />} />
    </Routes>
  </BrowserRouter>
);

}
