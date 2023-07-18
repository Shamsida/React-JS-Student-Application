import React from 'react';
import axios from "axios";
import { Button, Container, Col, Row, Table} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Input , Label, FormGroup} from 'reactstrap';
import { userContext } from '../App';
import { useContext } from 'react';
import { useState , useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';


function StudentData() {
  const navigate = useNavigate();
  const user = useContext(userContext);
  
  const { input , setInput, todos, setTodos }= user.state;
  const [todos1, setTodos1] = useState(todos);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setInput({
      name : "",
      age : "",
      dob : "",
      course : "",
    });
    setShow(false);
  }
  const handleShow = () => setShow(true);

    useEffect(() => {
        fetchData();
      }, []);

      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://localhost:7231/api/Student/GetItems"
          );
          const data = response.data;
          console.log(data,"data");
          setTodos1(data);
          console.log(todos1,"todo");
          setTodos(data);
        } catch (e) {
          console.error(e);
        }
      };

    const DeletHandle= async (id)=>{
      //const item = todos.filter((item)=>  item.id !== id);
      //setTodos1(item);
      //setTodos(item);
     const token= Cookies.get('token')
     console.log(token,"token auth");
      if(window.confirm("Are you sure to delete this student") === true){
        try {
          await axios.delete(`https://localhost:7231/api/Student/DeleteItems?Id=${id}`,{
            headers:{
              'Authorization':`Bearer ${token}`
            }
          })
          .then((result)=>{
            if(result.status ===200){
              console.log("Student deleted successfully!");
              fetchData();
              toast.success("Student deleted successfully!");
              //alert("Student deleted successfully!");
            }
          })
        } catch (error) {
          console.error(error);
          
        }
      }   
  };

  const EditHandle = async (id) => {
    console.log(id);
    handleShow();
    try{
      await axios.get(`https://localhost:7231/api/Student/GetItemsById?studid=${id}`)
      .then((result) => {
        // console.log(result.data);
        setInput(result.data);
        console.log(input, "data");
      })
    } catch(error){
      console.log(error);
      }
    }

    const onInputChange =(event) => {
      const {name , value} = event.target;
      setInput( (prev) => {
         return { ...prev, [name] : value };
      });
      console.log(user.state.input);
    };

  const handleUpdate = async () => {
    try{
      const response = await axios.put(`https://localhost:7231/api/Student/PutItems?Id=${user.state.input.studentId}`,{
          "id" : user.state.input.studentId,
          "name" : user.state.input.name,
          "age" : user.state.input.age,
          "dob" : user.state.input.dob,
          "course" : user.state.input.course
      },);
      const resData = response.data
      console.log(resData);
      fetchData();
      toast.success("Student data has been updated");
      handleClose();
  }
  catch(error){
      console.log(error.response.data);
  }
  }

  const handleSearch = (query) => {
    const newList = todos.filter(x => {
      const name = x.name.toLowerCase();
      const course = x.course.toLowerCase();
      const lowerCase = query.toLowerCase();
  
      return name.includes(lowerCase) || course.includes(lowerCase);
    });
    setTodos1(newList);
  };

  return (
    <div style={{marginLeft:100, marginRight:30}}>
       <ToastContainer />
       <div style={{marginTop:50}}>
        <div style={{display:'flex',justifyContent:"space-between", alignItems:'center'}}>
        <h1 style={{marginLeft:20}}>Students</h1>
        {/* <div style={{display:'flex' , justifyContent:"flex-end", height:40, marginRight:20}}> */}
        <Form className="d-flex" style={{marginRight:28}}>
          <Form.Control
            type="search"
            placeholder="Search"
            //value={input}
            aria-label="Search"
            style={{marginRight:10}}
            onChange={(e)=>{setInput(e.target.value)
              handleSearch(e.target.value);
            }}
          />
          <Button onClick={()=> navigate('/')} variant="outline-secondary">Add</Button>
        </Form>
        {/* <input type='text' 
              placeholder="Search"
              aria-label="Search"/>
        <Button  variant="outline-secondary">Add</Button> */}
        {/* </div> */}
        </div>
        
        <Container className="py-2 mt-2">
            <Row className="justify-content-center">
                <Table responsive="sm" striped bordered hover variant={'light'} className="mb-5">
                <thead>
                  <tr style={{textAlign:'center'}} >
                    <th>Name</th>
                    <th>Age</th>
                    <th>Date-Of-Birth</th>
                    <th>Course</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                    <tbody style={{textAlign:'center'}}>
                        {todos1.map((item, index)=>{
                            console.log(item.quantity);
                            return(
                                <tr key={index}>
                                    <td style={{paddingTop :50}}>{item.name} </td>
                                    <td>
                                        <h6 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverFlow: 'ellipsis', margin:0 , paddingTop:50}}>
                                            {item.age}
                                        </h6>
                                    </td>
                                    <td style={{paddingTop :50}}>{item.dob}</td>
                                    <td style={{paddingTop :50}}>{item.course}</td>
                                    {/* <td>up/del</td> */}
                                    <td style={{display: 'flex',justifyContent: 'center', height: '9rem', paddingTop:50}} >
                                      <Link onClick={()=>DeletHandle(item.studentId)}
                                      className='btn btn-outline-danger p-2' 
                                      style={{height: '33px' , display: 'flex' , justifycontent: 'center', marginRight:10 }}>
                                        <BsFillTrashFill /></Link>
                                      <Link onClick={()=>EditHandle(item.studentId)}
                                      className='btn btn-outline-primary p-2'
                                      style={{height: '33px' , display: 'flex' , justifycontent: 'center'}}>
                                        <BsFillPencilFill/></Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                  <Modal.Title>Modify / Update Student Data</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleUpdate} >
                      <FormGroup row>
                        <Label
                          for="id"
                          sm={2}
                        >
                        Id :
                        </Label>
                        <Col sm={10}>
                          <Input
                            name="id"
                            disabled
                            value={user.state.input.studentId}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label
                          for="image"
                          sm={2}
                        >
                        Name :
                        </Label>
                        <Col sm={10}>
                          <Input
                            name="name"
                            defaultValue={user.state.input.name}
                            placeholder="Enter name here"
                            type="text"
                          // onChange={(e)=>setData({...data, image : e.target.image })}
                            onChange={onInputChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label
                          for="title"
                          sm={2}
                        >
                        Age :
                        </Label>
                        <Col sm={10}>
                          <Input
                            name="age"
                            placeholder="Enter age here"
                            type="text"
                            defaultValue={user.state.input.age}
                            onChange={onInputChange}
                          // onChange={(e)=>setData({...data, title : e.target.title })}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label
                          for="price"
                          sm={2}
                        >
                        DOB :
                        </Label>
                        <Col sm={10}>
                        <Input
                          name="dob"
                          placeholder="Enter dob here"
                          type="text"
                          defaultValue={user.state.input.dob}
                      // onChange={(e)=>setData({...data, price : e.target.value })}
                          onChange={onInputChange}
                        />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label
                          for="type"
                          sm={2}
                        >
                        Course :
                        </Label>
                        <Col sm={10}>
                        <Input
                          name="course"
                          placeholder="Enter course here"
                          type="text"
                          defaultValue={user.state.input.course}
                          onChange={onInputChange}
                      // onChange={(e)=>setData({...data, category : e.target.category })}
                    //   onChange={(e)=>setProductData({...productdata, Type: product.state.Type})}
                        />
                        </Col>
                      </FormGroup>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleUpdate}>
                    Save Changes
                  </Button>
                  </Modal.Footer>
                </Modal>
            </Row>
        </Container>
        <div style={{marginLeft:800, display:'flex'}}>
        </div>
        </div>
        </div>
  )
}

export default StudentData;