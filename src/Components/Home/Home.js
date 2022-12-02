import styles from "./Home.module.css";
import React, { useEffect, useState } from "react";
import { Header } from "../Navbar/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import Cards from "../Card/Card";


// import Button from 'react-bootstrap/Button';

const Home = () => {
  const googleLogin = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/googleAuth`;
    window.open(url, "_self");
  };
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token") || Cookies.get("token");
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_SERVER_URL}/me`,
      headers: {
        authorisation: token,
      },
    }).then((res) => {
      setUser(res.data.user);
      setAccounts(res.data.user.otherAccounts);
    });
  }, []);
  return (
    <>
      <Header />
      <button onClick={googleLogin} className={styles.add_account_btn}>
        Add Account
      </button>
      <div className={styles.card_container} >
        {user.accessToken && (
          <Cards key={user._id} data={user}/>
        )}
        {accounts.length > 0 &&
          accounts.map((data) => <Cards key={data._id} data={data} />)}
      </div>
    </>
  );
};

export default Home;
