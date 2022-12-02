
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { Modals } from '../Modal/Modal';

function Cards({data}) {
  const [token, setToken] = useState('')
  const [files, setFiles]=useState('')
  const [show,setShow]=useState(false)
  const handleAdd = (e)=>{
    setToken(e.target.id)
    const accessToken = localStorage.getItem("token") || Cookies.get("token");
    const selectedToken = e.target.id

    axios({
      method:"POST",
      url:`${process.env.REACT_APP_SERVER_URL}/getFiles`,
      headers:{
        authorisation:accessToken
      },
      data:{
        token:selectedToken
      }
    }).then((res)=>{
      setFiles(res.data.files) 
      setShow(true)
    })

  }
  return (
    <>
    <Card  bg='light' border='success' style={{ width: '18rem' }}>
      <Card.Body>
      {/* <Card.Img variant="top" src={data.photo||"https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=826&t=st=1669959953~exp=1669960553~hmac=ba476927182ee97d2105f9bb1f9f9c602c801a5217b62b7e1dd79b996d59de7e"} /> */}

        <Card.Title>{data.name}</Card.Title>
        <Card.Text>
          {data.email}
        </Card.Text>
        <Button variant="primary" id={data.accessToken} onClick={handleAdd}  >Add Sheets</Button>
      </Card.Body>
    </Card>
    <Modals files={files} show={show} token={token} setShow={setShow}/>
    </>
  );
}

export default Cards;