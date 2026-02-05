import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "./Auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      {/* LEFT SIDE */}
      <div className="auth-left">
        <h1>Welcome to SpendWise</h1>
        <p>Master your daily spending</p>

        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create your free account" : "Log into your account"}
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
        {isLogin ? (
          <Login switchToSignup={() => setIsLogin(false)} />
        ) : (
          <Signup switchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}

export default Auth;
                                                                                                                                                                                                    