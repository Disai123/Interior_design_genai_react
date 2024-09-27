import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ForgotPasswordModal from "./ForgotPasswordModal";
import eye from "../../assets/svg/eye-fill.svg";
import eye2 from "../../assets/svg/eye-slash.svg";
import { LoadingIndicator } from "../../components/loader";
import img1 from "../../assets/images/img1.jpg";
import "./styles.css";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [email, setEmail] = useState("info@desai.net");
  const [password, setPassword] = useState("Keypulse@123");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const baseURL = "http://127.0.0.1:8000";

  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();

    const data = {
      username: email,
      password: password,
    };
    setLoading(true);

    axios
      .post(baseURL + "/login/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("email", response.data.email);
          navigate("/start-design");
        } else {
          alert("Login Failed");
        }
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response.data.error);
      });
  };

  return (
    <div
      className="container-fluid row m-0 p-0"
      style={{ background: "rgb(255 252 245)" }}
    >
      <img
        src={img1}
        alt="hello"
        className="col-md-6 pt-4 pb-4"
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <div className="col-md-6 col-xs-12 col-sm-12 text-center pt-lg-5 mt-lg-5">
        <div className="pt-5"></div>
        <div
          className="row mt-3"
          style={{
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="col-md-9 col-lg-9 col-sm-12 col-xs-12 mx-auto">
            <h2 className="mb-1">Login</h2>
            <form onSubmit={handleLogin} className="pr-lg-5 pl-lg-5">
              <div
                className="form-group d-flex flex-column"
                style={{ textAlign: "start" }}
              >
                <label className="label2 fs13">UserName*</label>
                <input
                  style={{ borderRadius: "40px" }}
                  className="form-control border"
                  id="email"
                  name="email"
                  autoComplete="off"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div
                className="form-group d-flex flex-column mt-3"
                style={{ textAlign: "start" }}
              >
                <label className="label2 fs13">Password*</label>
                <input
                  style={{ borderRadius: "40px" }}
                  type={toggle2 ? "text" : "password"}
                  className="form-control border"
                  id="password"
                  name="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="relative">
                  <img
                    className="eye3"
                    src={toggle2 ? eye2 : eye}
                    onClick={() => setToggle2(!toggle2)}
                    alt="Toggle Password Visibility"
                  />
                </div>
              </div>
              <div className="d-flex flex-row-reverse mb-4">
                <span
                  className="fs-12"
                  onClick={() => setShowForgotPassword(true)}
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Forgot Password
                </span>
              </div>
              <button
                className="font-weight-bold text-uppercase w-100 text-white border-0 login2"
                style={{
                  background: "rgb(72, 136, 200)",
                  borderRadius: "40px",
                  height: "40px",
                }}
                type={loading ? "button" : "submit"}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}{" "}
                {loading ? <LoadingIndicator size={"1"} /> : null}
              </button>
            </form>
            <div className="account2 mt-2">Don't Have An Account?</div>
            <Link to="/register" className="text-decoration-none register2">
              <span>Register</span>
            </Link>
          </div>
        </div>
      </div>
      <ForgotPasswordModal
        show={showForgotPassword}
        handleClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
};
