import React from "react";

const Subscription = () => {
  return (
    <div className="subscription">
      <div className="subscription__header">
        <h1>Choose the plan that's right for you</h1>
        <p>Watch all you want. Ad-free. Cancel anytime.</p>
      </div>

      <div className="subscription__plans">
        <div className="plan">
          <h3>Basic</h3>
          <p className="price">$8.99/month</p>
          <ul>
            <li>Watch on 1 screen at a time</li>
            <li>HD available</li>
            <li>Unlimited movies and TV shows</li>
          </ul>
          <button className="plan-button">Subscribe</button>
        </div>

        <div className="plan featured">
          <h3>Standard</h3>
          <p className="price">$13.49/month</p>
          <ul>
            <li>Watch on 2 screens at a time</li>
            <li>HD and Ultra HD available</li>
            <li>Unlimited movies and TV shows</li>
          </ul>
          <button className="plan-button">Subscribe</button>
        </div>

        <div className="plan">
          <h3>Premium</h3>
          <p className="price">$17.99/month</p>
          <ul>
            <li>Watch on 4 screens at a time</li>
            <li>HD, Ultra HD and HDR available</li>
            <li>Unlimited movies and TV shows</li>
          </ul>
          <button className="plan-button">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
