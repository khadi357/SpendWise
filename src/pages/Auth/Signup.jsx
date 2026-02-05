import { useState } from "react";
import { signupUser } from "../../services/auth.service";

function Signup({ switchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    // phone: "",
    password: "",
  });

  const handleSignup = async () => {
    try {
      const { name, email, password } = form; await signupUser({ name, email, password });
      // await signinUser(form);

      alert("Account created successfully");

      // ✅ Go back to login
      switchToLogin();
    } catch (err) {
      console.error("Signup error:", err);
      alert(err.response?.data?.message || err.message || "Signup failed");
    }
  };

  return (
    <>
      <h2>Create Account</h2>

      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      {/* <input
        placeholder="Phone Number"
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      /> */}

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button onClick={handleSignup}>Create Account</button>

      <p>
        Already have an account?{" "}
        <span onClick={switchToLogin}>Login</span>
      </p>
    </>
  );
}

export default Signup;


