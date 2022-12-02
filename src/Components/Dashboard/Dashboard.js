import styles from "../Home/Home.module.css";
import { Header } from "../Navbar/Navbar";
import Card from "react-bootstrap/Card";
import Cookies from "js-cookie";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const Dashboard = () => {
  const [sheets, setSheets] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token") || Cookies.get("token");
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_SERVER_URL}/me`,
      headers: {
        authorisation: token,
      },
    }).then((res) => {
      setSheets(res.data.user.spreadSheets);
      //   console.log(res.data.user)
    });
  }, []);
  return (
    <>
      <Header />
      <div className={styles.card_container}>
      {sheets.length > 0 &&
        sheets.map((obj, index) => {
          return (
              <Card
                bg="dark"
                key={index}
                text="white"
                style={{ width: "18rem" }}
                border="success"
              >
                <Card.Header>{obj.name}</Card.Header>
                <Card.Body>
                  <Card.Title>{obj.title}</Card.Title>
                  <Card.Text>{`Column-Count:-${obj.column}`}</Card.Text>
                </Card.Body>
              </Card>
          );
        })}
        </div>
    </>
  );
};
