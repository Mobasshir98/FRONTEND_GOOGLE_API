import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import Select from 'react-select'
import { useNavigate } from "react-router-dom";


export const Modals = ({ show, files, token, setShow }) => {
    const [sheetName, setsheetName] = useState('')
    const [tabName,setTabName]=useState('')
    const [tabs,setTabs]=useState([])
    const [sheetId,setsheetId] = useState("")
    const navigate = useNavigate()
    const handleNameChange = (selectedOption)=>{
    const id = selectedOption.value
    setsheetId(id)
    const accessToken = localStorage.getItem("token") || Cookies.get("token");
    axios({
        method:"POST",
        url:`${process.env.REACT_APP_SERVER_URL}/getSheets`,
        headers:{
          authorisation:accessToken
        },
        data:{
          token:token,
          id:id
        }
      }).then((res)=>{
        setTabs(res.data.sheets)
        setsheetName(selectedOption.label)
      })
    }
    const fileOptions = files.length>0&&files.map((obj)=>{
        return {value:obj.id,label:obj.name}
    }) 
    const tabOptions= tabs.length>0&&tabs.map((obj,index)=>{
        return {value:index,label:obj.title}
    })

    const handleTabChange = (selectedOption)=>{
        setTabName(selectedOption.label)
    }
    const handleAddSheet = ()=>{
        // console.log(tabName)
        // console.log(sheetName)
        const {Count} = tabs.find((obj)=>{
            return tabName===obj.title
        })
        const accessToken = localStorage.getItem("token") || Cookies.get("token");
        axios({
            method:"POST",
            url:`${process.env.REACT_APP_SERVER_URL}/addSheets`,
            headers:{
              authorisation:accessToken
            },
            data:{
              token:token,
              id:sheetId,
              column:Count,
              name:sheetName,
              title:tabName
            }
          }).then((res)=>{
            setShow(false)
            navigate('/dashboard')
          })
        

    }
  return (
    <>
      <Modal show={show} onHide={()=>{
        setShow(false)
      }} >
        <Modal.Header>
          <Modal.Title>Adding a sheet from subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Sheet Name</Form.Label>
             <Select onChange={handleNameChange} options={fileOptions} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tab Name</Form.Label>
              <Select onChange={handleTabChange} isDisabled={sheetName?false:true} options={tabOptions} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={sheetName&&tabName?false:true} onClick={handleAddSheet} variant="primary">Add Sheet</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
