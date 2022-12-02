import styles from "./Logout.module.css";
// import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
// import axios from "axios";
import Cookies from "js-cookie";
const Logout = () => {
  const handleLogout = () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/logout`;
    localStorage.removeItem("token");
    Cookies.remove("token");
    window.open(url,"_self")
    // navigate("/login");
    // window.location.reload();
  };

  return (
    <>
      <button className={styles.logout_btn} onClick={handleLogout}>
        <AiOutlineLogout /> <span>LOGOUT</span>
      </button>
    </>
  );
};
export default Logout;
