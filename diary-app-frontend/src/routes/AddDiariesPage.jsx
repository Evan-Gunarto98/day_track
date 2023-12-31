import React, { useEffect, useState,useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Card, CardContent, Typography, TextField, Button,Container } from '@mui/material';
import { styled } from '@mui/system';
import '../App.css'
import apis from '../apis';
import { useParams,useNavigate } from 'react-router-dom';

const DiaryCard = styled(Card)(({ theme }) => ({
  
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  width: '100%',
  maxWidth:'80vw',
  marginBottom: theme.spacing(2),
  backgroundColor: '#272829',
  paddingTop:'20px'


}));

const DiaryHeader = styled(CardContent)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  

});

const DiaryTextArea = styled(TextField)({
  width:'90%',
  margin:'20px',
  marginBottom: '8px',


  
});

const TextContainer = styled(Container)({
    padding:'20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column',
    background:'#272829'
    
    
});




const ViewButton = styled(Button)(() => ({
  display: 'flex',
  margin: '20px',
  background: '#202020'
}));



const AddDiariesPage = () => {
  const {id} = useParams();
  const currentDate = new Date().toLocaleDateString();
  const userName = 'John Doe'; // Replace this with the user's name
  const [diaryText,setDiaryText] = useState('');
  const [flag,setFlag] = useState(0);
  const [rowHeight,setRowHeight] = useState(1)
  const navigate = useNavigate();
  const ref = useRef(null)


  useEffect(()=>{
    const fetchData = async () => { 
      try{
        const databaseId = parseInt(id)-1
        const response = await apis.get(`/${databaseId}`)
        
        setDiaryText(response.data.data.diaries.text);
        // setFlag(1)
        console.log(response)
        dynamicRow();
      }catch(error){
        console.error(error)
      }
    }

    fetchData()
    
  },[])


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  const handleSave = async(e) =>{
      e.preventDefault()
      try {
            const response = await apis.post(`/save`,{
              date:formatDate(currentDate),
              text:diaryText
            });
            navigate('/')
      } catch (error) {
        
      }
  }


  const dynamicRow = () =>{
    // if (window.innerWidth <= 800) {
    //   setRowHeight(25)
    // } else {
      setRowHeight(0) 
  // }
  }

  return (
    <div class="container" style={{ backgroundColor: '#202020' }} >
        <Header />
        <TextContainer style={{display:'flex',justifyContent:'center',alignItems:'center'
    ,flexDirection:'column'}}>
             <DiaryCard>
                <DiaryHeader>
                    <Typography variant="subtitle2" color="textSecondary">
                    {currentDate}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                    {/* {userName} */}
                    </Typography>
                </DiaryHeader>
                <DiaryTextArea
                    id="diary-entry"
                    label="Write here..."
                    multiline
                    rows={rowHeight}
                    variant="outlined"
                    value={diaryText}
                    onChange={e => setDiaryText(e.target.value)}
                />
                {/* Add a save button or any other actions here */}
                <ViewButton variant="contained" ref={ref} onClick={handleSave}>Save Diary</ViewButton>
            
            </DiaryCard>
        </TextContainer>
           
        <Footer/>
    </div>
  );
};


export default AddDiariesPage;