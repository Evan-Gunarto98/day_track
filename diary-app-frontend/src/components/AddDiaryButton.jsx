import React, { useEffect, useState ,useRef} from "react";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import apis from '../apis';

const AddButton = styled(Button)(() => ({
  display: 'flex',
  background: '#FFFFFF', 
  '&:hover': {
    background: 'grey', // Change the color when the button is hovered
  },
}));

const ButtonLink = styled(Link)(() => ({
  textDecoration: 'none',
  fontWeight:600,
  color:'black',
  transition: 'color 0.3s', // Add a transition for a smooth color change
 
}));

const AddDiaryButton = () => {
  const [ttldiaries, setTtlDiaries] = useState([]);
  const currDate = new Date();
  const [flag,setFlag] = useState('0')
  const [hideButton,setHideButton] = useState('');
  const year = currDate.getFullYear();
const month = String(currDate.getMonth() + 1).padStart(2, '0');
const day = String(currDate.getDate()).padStart(2, '0');

const currentDate = `${month}/${day}/${year}`;
  const ref = useRef(null);

  // const handleSave = async () => {
  //   try {
  //     await apis.post('/save', {
  //       date: currentDate,
  //       text: ''
  //     });

  //     // Fetch the updated list of diaries
  //     const response = await apis.get('/');
  //     setTtlDiaries(response.data.data.diaries);

  //     // Navigate to the newly created diary
  //     const newlyCreatedDiary = response.data.data.diaries[0];
  //     if (newlyCreatedDiary) {
  //       window.location.href = `/diary/${newlyCreatedDiary.id}`;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apis.get('/');
        setTtlDiaries(response.data.data.diaries);
       
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchData();
   
  }, []);

  // useEffect(() => {
  //   checkMade();
  // }, [ttldiaries]);


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // next feature dont allow dupes
  // const checkMade = () =>{
  
  //   console.log(currentDate)
  //   // console.log(ttldiaries[0].date)
  //   var datecollection = ttldiaries.filter((x) => formatDate(x.date) === currentDate)
  //   if(datecollection.length!== 0){
  //     setFlag(1)
  //     console.log(datecollection)
  //   }else{
  //     setFlag(0)
  //     console.log('empty')
  //   }
    
  //   if(datecollection.length!== 0){
  //     setFlag(1)
  //     setHideButton('Wait tomorrow')
  //   }else{
  //     setFlag(0)
  //     setHideButton('Create Diary')
  //   }

  // }

  return (
    <div>
      <div style={{
        marginTop: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <AddButton >
          <ButtonLink ref={ref} to={'/add'} >
            Create Diary
          </ButtonLink>
        </AddButton>
      </div>
    </div>
  )
}

export default AddDiaryButton;
