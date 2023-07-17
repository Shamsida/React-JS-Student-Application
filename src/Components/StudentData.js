import React from 'react';
import axios from "axios";
import { Button, Container, Col, Row, Table} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { userContext } from '../App';
import { useContext } from 'react';
import { useState , useEffect } from 'react';


function StudentData() {
  const navigate = useNavigate();
  const user = useContext(userContext);
  
  const { input, setInput, todos, setTodos }= user.state;
    const [todos1, setTodos1] = useState(todos);

    useEffect(() => {
        fetchData();
      }, []);

      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://localhost:7231/api/Student/GetItems"
          );
          const data = response.data;
          console.log(data);
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
      try {
        await axios.delete(`https://localhost:7231/api/Student/DeleteItems?Id=${id}`);
        console.log("Student deleted successfully!");
        alert("Student deleted successfully!");
        fetchData();
      } catch (error) {
        console.error(error);
        
      }
  };

  const EditHandle = (id) => {
    alert(id);
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
            </Row>
        </Container>
        <div style={{marginLeft:800, display:'flex'}}>
        </div>
        </div>
        </div>
  )
}

export default StudentData;