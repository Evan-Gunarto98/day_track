import React, { useEffect, useState ,useRef} from "react";

import { useAppContext } from '../routes/Home';
import { Button } from '@mui/material';
import { Link ,useNavigate} from 'react-router-dom';
import { styled } from '@mui/system';
import apis from '../apis';

const AddButton = styled(Button)(() => ({
  display: 'flex',
  background: '#61677A', 
  '&:hover': {
    background: 'grey', // Change the color when the button is hovered
  },  
  
}));

const ButtonLink = styled(Link)(() => ({
  textDecoration: 'none',
  fontWeight:600,
  color:'#FFF6E0',
  transition: 'color 0.3s', // Add a transition for a smooth color change
 
}));

const AddDiaryButton = () => {
  const [ttldiaries, setTtlDiaries] = useState([]);
  const currDate = new Date();
  const [flag,setFlag] = useState('0')
  const [hideButton,setHideButton] = useState('');
  const [disableButton,setDisableButton] = useState(false);
  const year = currDate.getFullYear();
const month = String(currDate.getMonth() + 1).padStart(2, '0');
const day = String(currDate.getDate()).padStart(2, '0');
const navigate = useNavigate();
const currentDate = `${month}/${day}/${year}`;
  const ref = useRef(null);
  const {refreshAddDiaryButton} = useAppContext();

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

  const handleButtonClick = () => {
   
    console.log('buttonclicked')
    navigate('/add')
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apis.get('/');
        setTtlDiaries(response.data.data.diaries);
        console.log(refreshAddDiaryButton)
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchData();
   
  }, [refreshAddDiaryButton]);

  useEffect(() => {
    checkMade();
  }, [ttldiaries,hideButton,flag]);


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // next feature dont allow dupes
  const checkMade = () =>{
  
    console.log(currentDate)
    // console.log(ttldiaries[0].date)
    var datecollection = ttldiaries.filter((x) => formatDate(x.date) === currentDate)
    if(datecollection.length!== 0){
      setFlag(1)
      console.log(datecollection) 
      setHideButton('Wait tomorrow')
      setDisableButton(true)
    }else{
      setFlag(0)
      console.log('empty')
      setHideButton('Create Diary')
      setDisableButton(false)
    }
    
  
  }

  return (
    <div>
      <div style={{
        marginTop: '50px',
        marginBelow: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <AddButton onClick={handleButtonClick} disabled={disableButton}>
          <ButtonLink ref={ref}  >
            {hideButton}
          </ButtonLink>
        </AddButton>
      </div>
    </div>
  )
}

export default AddDiaryButton;
