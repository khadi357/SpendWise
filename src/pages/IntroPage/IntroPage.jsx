import { useNavigate } from "react-router-dom";
import "./IntroPage.css";
// import logo from "../../Image/SpendWise.jpg";

function IntroPage() {
  const navigate = useNavigate();

  return (
    <div className="intro-container">
      
     
      {/* LEFT SIDE */}
      <div className="intro-left">
        {/* <img src={logo} alt="SpendWise Logo" className="intro-logo" /> */}
        <h1>SpendWise</h1>
        <h4>Master your daily spending</h4>


        <h2>Never run out of money before month-end</h2>

        <p>
          SpendWise calculates exactly how much you can safely spend each day,
          helping you stay on track and avoid financial stress.</p>
          <p>Perfect for students, young professionals, and anyone learning to budget.
        </p>

        <button onClick={() => navigate("/auth")} className="primary-btn">
          Get Started
        </button>

        <div className="intro-footer">
          <span>✔ No bank integration needed</span>
          <span>✔ 100% manual control</span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="intro-right">
        <h3>How SpendWise helps you</h3>

        <ul>
          <li>
            <strong>Daily Safe-to-Spend Amount</strong>
            <p>Know exactly how much you can spend today.</p>
          </li>

          <li>
            <strong>Real-Time Balance Updates</strong>
            <p>Your daily allowance updates automatically.</p>
          </li>

          <li>
            <strong>Visual Health Indicators</strong>
            <p>Green, yellow, red spending feedback.</p>
          </li>

          <li>
            <strong>Simple Manual Tracking</strong>
            <p>No complicated setup.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default IntroPage;





