import React,{ useEffect} from 'react';
import { Container, Row, Col, Button, Form} from 'react-bootstrap';
import { useContext } from 'react';
import { userContext } from '../App';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {

    const user = useContext(userContext);
    const { input, setInput, todos, setTodos }= user.state;
    const navigate = useNavigate();

    useEffect(() => {
        console.log(todos)
      }, [todos]);

       const onInputChange =(event) => {
           const {name , value} = event.target;
            console.log(user.state.input)
           setInput( (prev) => {
              return {...prev, [name] : value };
           });
         };

      const handleSubmit =async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        console.log(input);
        setTodos([...todos, { id:Date.now(),name:user.state.input.name, age:user.state.input.age, dob:user.state.input.dob, course:user.state.input.course, completed:false}]);
        console.log(todos);
            const name = form.name.value;
            const age = form.age.value;
            const dob = form.dob.value;
            const course = form.course.value;
            console.log(name, age, dob, course);
        try{
            const response = axios.post('https://localhost:7231/api/Student/PostItems',{
                name,
                age,
                dob,
                course
            },);
            const resData = response.data
            console.log(resData);
            navigate('/studentdata')
        }
        catch(error){
            console.log(error.response.data);
        }
      };

    return (
       <Container className="">
            <Row className="justify-content-center mt-5">
                <Col style={{width:600}} xs={11} sm={10} md={8} lg={4} className={`p-4 rounded text-black bg-light`}>
                    <h1 className={`text-center border-bottom pb-3 text-light-primary`}>
                        Add Student Data
                    </h1>
                    <Form onSubmit={handleSubmit} >
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control  
                                    name="name" 
                                    type="text" 
                                     onChange={onInputChange}
                                    placeholder="Name" required />
                            </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control  
                                name="age" 
                                type="text" 
                                 onChange={onInputChange}
                                placeholder="Age" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date OF Birth</Form.Label>
                            <Form.Control  
                                name="dob" 
                                type="date" 
                                 onChange={onInputChange}
                                placeholder="mm/dd/yy" 
                                minLength={3} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Course </Form.Label>
                            <Form.Control   
                                name="course" 
                                type="text" 
                                 onChange={onInputChange}
                                placeholder="Course" required />
                        </Form.Group>
                        <div style={{display:'flex' , justifyContent:'center'}}>
                        <Button
                            type="submit"
                            className={`bg-light-primary  d-block`}
                            style={{border: 0 }}
                        >Submit
                        </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
       </Container>
    );
};

export default Register;