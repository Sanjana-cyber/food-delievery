import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Review.css";
import "./style.css";

export default function Review() {
  const [reviews, setReviews] = useState([
    { id: 1, user: "Amit Sharma", initial: "A", rating: 5, comment: "The Cheese Burger is absolutely legendary! Best in Ludhiana." },
    { id: 2, user: "Priya Kaur", initial: "P", rating: 4, comment: "Fast delivery and the food was still hot. Loved the Paneer Burger." },
    { id: 3, user: "Rahul Verma", initial: "R", rating: 5, comment: "Sethi Burger never disappoints. Premium quality at great prices." },
  ]);

  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    
    const reviewToAdd = {
      id: Date.now(),
      user: newReview.name,
      initial: newReview.name[0].toUpperCase(),
      rating: parseInt(newReview.rating),
      comment: newReview.comment
    };
    
    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ name: "", rating: 5, comment: "" });
    alert("Thank you for your review!");
  };

  return (
    <div className="reviews-page">
      <Navbar />
      
      <main className="reviews-container">
        <div className="reviews-header">
          <h1>Customer Reviews</h1>
          <p>Don't just take our word for it—hear from our fans!</p>
        </div>

        <div className="reviews-grid">
          {reviews.map(rev => (
            <div key={rev.id} className="review-card">
              <div className="review-user">
                <div className="user-avatar">{rev.initial}</div>
                <div className="user-info">
                  <h4>{rev.user}</h4>
                  <div className="stars">{"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}</div>
                </div>
              </div>
              <p className="review-text">"{rev.comment}"</p>
            </div>
          ))}
        </div>

        <section className="review-form-section">
          <h2>Share Your Experience</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={newReview.name}
                onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <select 
                value={newReview.rating}
                onChange={(e) => setNewReview({...newReview, rating: e.target.value})}
              >
                <option value="5">5 Stars - Excellent</option>
                <option value="4">4 Stars - Very Good</option>
                <option value="3">3 Stars - Good</option>
                <option value="2">2 Stars - Fair</option>
                <option value="1">1 Star - Poor</option>
              </select>
            </div>
            <div className="form-group">
              <label>Your Review</label>
              <textarea 
                placeholder="What did you think of your meal?"
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-review-btn">Submit Review</button>
          </form>
        </section>
      </main>
    </div>
  );
}
