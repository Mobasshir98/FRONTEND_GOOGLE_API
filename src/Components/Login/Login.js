import styles from './Login.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const navigate = useNavigate("/dashboard")
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/login`;
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token",res.data)
      navigate('/dashboard')

    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        setError(err.response.data.message)
      }
    }
  };
  const googleLogin = async ()=>{
    const url = `${process.env.REACT_APP_SERVER_URL}/googleAuth`;
    window.open(url,'_self')
  }
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
        <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {error&&<div className={styles.error_msg} >{error}</div> }
            <button type="submit" className={styles.green_btn}>
              Sign in
            </button>
            <button type="button" className={styles.google_btn} onClick={googleLogin} >
             Sign in with Google
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>Create Account!</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login
