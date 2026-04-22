import React from "react";
import Navbar from "./Navbar";
import "./Order.css";
import "./style.css";
import burgerImg from "./assets/premium_cheeseburger.png";
import cokeImg from "./assets/cocacola.png";

export default function Order() {
  // Mock order data
  const orderData = {
    id: "#SB-992104",
    status: "Out for Delivery",
    items: [
      { id: 1, name: "Cheese Burger", qty: 2, price: 298, image: burgerImg },
      { id: 2, name: "Cold Coffee", qty: 1, price: 99, image: cokeImg },
    ],
    address: {
      name: "Sanjana Cyber",
      phone: "9877932989",
      line1: "Tajpur Road, Near Kali Mata Mandir",
      city: "Ludhiana, Punjab - 141008",
    },
    payment: "Cash on Delivery",
    subtotal: 397,
    delivery: 40,
    total: 437
  };

  return (
    <div className="order-page">
      <Navbar />
      
      <main className="order-content">
        <div className="order-header">
          <h1>Track Your Order</h1>
          <p>Your delicious meal is on its way!</p>
        </div>

        <div className="order-card">
          <div className="order-status-banner">
            <div className="status-info">
              <span className="order-id">Order {orderData.id}</span>
              <h2 style={{ marginTop: "0.5rem" }}>{orderData.status}</h2>
            </div>
            <div className="status-badge">Processing</div>
          </div>

          <div className="order-items-list">
            {orderData.items.map(item => (
              <div key={item.id} className="order-item-row">
                <div className="item-main">
                  <div className="item-img-mini">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-name-qty">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.qty}</p>
                  </div>
                </div>
                <div className="item-price-final">₹{item.price}</div>
              </div>
            ))}
          </div>

          <div className="order-details-grid">
            <div className="details-section">
              <h4>Delivery Address</h4>
              <p><strong>{orderData.address.name}</strong></p>
              <p>{orderData.address.line1}</p>
              <p>{orderData.address.city}</p>
              <p>Phone: {orderData.address.phone}</p>
            </div>
            <div className="details-section">
              <h4>Payment Method</h4>
              <p>{orderData.payment}</p>
              <div className="order-summary-box">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{orderData.subtotal}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>₹{orderData.delivery}</span>
                </div>
                <div className="summary-row grand-total">
                  <span>Total Paid</span>
                  <span>₹{orderData.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
