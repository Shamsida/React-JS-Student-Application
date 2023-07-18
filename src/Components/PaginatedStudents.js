import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PaginatedStudents = () => {
    const [pageNo,setPageNo] = useState(1)
    const [stud,setStud] = useState([])
    const fetchPaginatedStud = async()=>{
        try{
            const response = await axios.get(`https://localhost:7231/api/Student/${pageNo}`)
            const data = response.data;
            console.log(data,"paginated data");
            setStud(data)
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchPaginatedStud();
    },[pageNo])
  return (
    <div>
      <button onClick={()=>setPageNo(1)}>1</button>
      <button onClick={()=>setPageNo(2)}>2</button>
      <button onClick={()=>setPageNo(3)}>3</button>
    </div>
  )
}

export default PaginatedStudents
