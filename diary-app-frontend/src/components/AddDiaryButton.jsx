import React, { useEffect, useState } from "react";
import {Button} from '@mui/material';
import {Link} from 'react-router-dom';
import { styled } from '@mui/system';
import apis from '../apis';

const AddButton = styled(Button)(()=>({
    display: 'flex',
  background: '#FFFFFF'
}));



const AddDiaryButton = () =>{

    const [ttldiaries,setTtlDiaries] = useState([]);



  useEffect(()=>{
    const fetchData = async () => { 
      try{
        const response = await apis.get('/')
        
        setTtlDiaries(response.data.data.diaries);
       
      }catch(error){
        console.error(error)
      }
    }

    fetchData()
  },[])

 console.log(ttldiaries.length)
    return (
        <div>
            <div style={{
                marginTop:'100px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
             
            }}>
                 <AddButton>
                    <Link to={`/diary/${ttldiaries}`}>
                    YOLOE
                    </Link>
                    
                </AddButton>
            </div>
        </div>
    )
}



export default AddDiaryButton;