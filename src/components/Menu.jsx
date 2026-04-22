import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Menu.css";
import "./style.css";

// Import existing assets
import burgerImg from "./assets/premium_cheeseburger.png";
import cokeImg from "./assets/cocacola.png";
import pepsiImg from "./assets/pepsi.png";
// Add these imports at the top of Menu.jsx


const INITIAL_FOOD_ITEMS = [
  { id: 1, name: "Cheese Burger", category: "Burgers", price: 149, description: "Juicy grilled patty with melted cheese, fresh lettuce.", image: burgerImg },
  { id: 2, name: "Veg Burger", category: "Burgers", price: 129, description: "Classic veg patty with crisp veggies and mayo.", image: burgerImg },
  { id: 3, name: "Double Tikki Burger", category: "Burgers", price: 169, description: "Double the crunch with two signature tikki patties.", image: burgerImg },
  { id: 4, name: "Paneer Burger", category: "Burgers", price: 179, description: "Soft paneer patty with spicy herb dressing.", image: burgerImg },
  { id: 5, name: "Crispy Chicken Burger", category: "Burgers", price: 199, description: "Golden fried chicken breast with special sauce.", image: burgerImg },

  { id: 7, name: "Coke", category: "Drinks", price: 99, description: "Coca Cola", image: cokeImg },

];

export default function Menu() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredItems = filter === "All"
    ? INITIAL_FOOD_ITEMS
    : INITIAL_FOOD_ITEMS.filter(item => item.category === filter);

  const addToCart = (item, qty) => {
    if (qty <= 0) return;
    setCart(prevCart => {
      const existing = prevCart.find(i => i.id === item.id);
      if (existing) {
        return prevCart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prevCart, { ...item, quantity: qty }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryCharge = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryCharge;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Please add items to your cart first!");
      return;
    }
    setShowSuccess(true);
    setCart([]);
    setForm({ name: "", mobile: "", address: "", landmark: "", city: "", pincode: "", payment: "Cash on Delivery" });
  };

  return (
    <div className="menu-page shop-ui">

      <Navbar />

      <div className="shop-layout">
        {/* MENU SECTION */}
        <div className="menu-section">
          <div className="menu-header">
            <h1>Our Menu</h1>
            <p>Savor the best flavors in town, crafted with love.</p>

            <div className="filter-buttons">
              {["All", "Burgers", "Drinks"].map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filteredItems.map(item => (
              <FoodCard key={item.id} item={item} onAdd={addToCart} />
            ))}
          </div>
        </div>

        {/* ORDER PANEL */}
        <div className="order-panel">
          <div className="panel-card">
            <h2>Order Summary</h2>
            <div className="cart-items">
              {cart.length === 0 ? (
                <p className="empty-msg">Your cart is empty</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">₹{item.price}</span>
                    </div>
                    <div className="qty-controls">
                      <button onClick={() => updateCartQty(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateCartQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bill-details">
              <div className="bill-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="bill-row"><span>Delivery</span><span>₹{deliveryCharge}</span></div>
              <div className="bill-row total"><span>Total</span><span>₹{total}</span></div>
            </div>

            <form className="order-form" onSubmit={handlePlaceOrder}>
              <h3>Customer Details</h3>
              <input type="text" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              <input type="tel" placeholder="Mobile Number" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} required />
              <textarea placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required />
              <div className="form-row">
                <input type="text" placeholder="Landmark" value={form.landmark} onChange={e => setForm({ ...form, landmark: e.target.value })} />
                <input type="text" placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} required />
              </div>
              <input type="text" placeholder="Pincode" value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} required />

              <select value={form.payment} onChange={e => setForm({ ...form, payment: e.target.value })}>
                <option>Cash on Delivery</option>
                <option>UPI</option>
                <option>Card</option>
              </select>

              <button type="submit" className="place-order-btn">Place Order</button>
            </form>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="success-modal">
          <div className="modal-content">
            <div className="success-icon">✓</div>
            <h2>Order Placed!</h2>
            <p>Your order has been placed successfully. It will arrive shortly.</p>
            <button onClick={() => setShowSuccess(false)}>Awesome!</button>
          </div>
        </div>
      )}
    </div>
  );
}

function FoodCard({ item, onAdd }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="food-card">
      <div className="card-img">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="card-body">
        <div className="card-header-row">
          <h3 className="food-name">{item.name}</h3>
          <span className="food-price">₹{item.price}</span>
        </div>
        <p className="food-desc">{item.description}</p>
        <div className="card-footer-row">
          <div className="qty-picker">
            <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>
          <button className="add-btn" onClick={() => { onAdd(item, qty); setQty(1); }}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
