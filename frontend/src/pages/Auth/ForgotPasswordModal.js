// ForgotPasswordModal.js
import React, { useState } from "react";
import axios from "axios";

const ForgotPasswordModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendEmail = () => {
    setLoading(true);
    axios
      .post("http://127.0.0.1:8000/forgot-password/", { email })
      .then((response) => {
        setLoading(false);
        setMessage("Reset link sent to your email.");
      })
      .catch((error) => {
        setLoading(false);
        setMessage("Error sending email. Please try again.");
      });
  };

  if (!show) {
    return null;
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h5>Forgot Password</h5>
          <button onClick={handleClose} style={styles.closeButton}>
            X
          </button>
        </div>
        <div style={styles.body}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <button onClick={handleSendEmail} disabled={loading} style={styles.button}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "5px",
    width: "400px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    background: "transparent",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
  body: {
    marginTop: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    background: "rgb(72, 136, 200)",
    color: "white",
    cursor: "pointer",
  },
};

export default ForgotPasswordModal;
