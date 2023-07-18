import React,{ useState , createContext } from 'react';
import { Routes, Route , BrowserRouter} from "react-router-dom";
import './App.css';
import Header from './Components/Header';
import Register from './Components/RegisterForm';
import StudentData from './Components/StudentData';
import PaginatedStudents from './Components/PaginatedStudents';

const userContext = createContext ();

function App() {

  const [input, setInput] = useState({
    id : '',
    name : "",
    age : "",
    dob : "",
    course : "",
  });
  const [todos, setTodos] = useState([]);

  const state ={
    input:input,
    setInput:setInput,
    todos:todos,
    setTodos:setTodos
  }

  return (
    <BrowserRouter>
      <Header />
        <userContext.Provider value={{state}}>
        <Routes>
          <Route path="/" exact element={<Register/>} />
          <Route path="studentdata" element={<StudentData />} />
        </Routes>
        </userContext.Provider>
    </BrowserRouter>
    // <PaginatedStudents/>
  );
}

export default App;
export {userContext};
