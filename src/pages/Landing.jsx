import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return  (
    <div className="landing">
      <h1>Welcome to SpendWise</h1>
      <p>Master your daily spending</p>

      <button onClick={() => navigate("/auth")} className="primary-btn">CREATE YOUR FREE ACCOUNT</button>
      <button onClick={() => navigate("/auth")} className="secondary-btn">LOGIN </button>
    </div>
  );
}

export default Landing;