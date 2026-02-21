
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";

// استيراد الشعار (يمكن استخدام public/assets أو import)
import logo from "../../assets/logo.png"; // إذا كان الشعار داخل src/assets
import { AuthContext } from "../../context/AuthContext ";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const { login, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await login(credentials);
      navigate("/");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "فشل تسجيل الدخول");
    }
  };

  return (
    <div className="login">
      <div className="login-card">
        <div className="login-left">
          <img src={logo} alt="شعار المتجر" className="logo" />
          <h2>مرحباً بعودتك</h2>
          <p>سجل دخولك لإدارة متجرك بكل سهولة</p>
        </div>
        <div className="login-right">
          <h1 className="login-title">تسجيل الدخول</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>اسم المستخدم أو البريد الإلكتروني</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                placeholder="أدخل اسم المستخدم"
              />
            </div>
            <div className="form-group">
              <label>كلمة المرور</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                placeholder="أدخل كلمة المرور"
              />
            </div>
            {errorMsg && <div className="error-message">{errorMsg}</div>}
            <button type="submit" disabled={loading} className="login-btn">
              {loading ? "جاري التحميل..." : "دخول"}
            </button>
          </form>
          {/* <p className="register-link">
            ليس لديك حساب؟ <a href="/register">سجل الآن</a>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
