import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Card, CardContent, Typography, TextField, Button,Container } from '@mui/material';
import { styled } from '@mui/system';
import '../App.css'
import apis from '../apis';
import { useParams } from 'react-router-dom';

const DiaryCard = styled(Card)(({ theme }) => ({
  
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  width: '100%',
  height:'100%',
  maxWidth:'80vw',
  maxHeight:'100vh',
  marginBottom: theme.spacing(2),
  backgroundColor: '#f0f0f0',
}));

const DiaryHeader = styled(CardContent)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width:'90%'
});

const DiaryTextArea = styled(TextField)({
  width:'90%',
  marginLeft:'20px',
  marginRight:'20px',
  marginBottom: '8px',
   height:'80vh',
  
});

const TextContainer = styled(Container)({
    padding:'20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overrides: {
      MuiFormControl: {
        root: {
          height: '200px',
        },
      },
      MuiInputBase: {
        root: {
          height: '200Px',
        },
      },
    }
});

const ViewButton = styled(Button)(() => ({
  display: 'flex',
  margin: '20px',
  background: '#202020'
}));


const DiaryPage = () => {
  const {id} = useParams();
  const currentDate = new Date().toLocaleDateString();
  const userName = 'John Doe'; // Replace this with the user's name
  const [diaryText,setDiaryText] = useState('');
  const [flag,setFlag] = useState(0);

  useEffect(()=>{
    const fetchData = async () => { 
      try{
        const response = await apis.get(`/${id}`)
        
        setDiaryText(response.data.data.diaries.text);
        setFlag(1)
        console.log(response.data.data.diaries)
      }catch(error){
        console.error(error)
      }
    }

    fetchData()
    
  },[])


  const handleSave = async(e) =>{
   
      e.preventDefault()

      try {
        if(flag==0){
          const response = await apis.post('/save',{
                      
                      date:currentDate,
                      text:diaryText
                  });
        }else{
         
            const response = await apis.put(`/save/${id}`,{
              id:id,
              text:diaryText
          });
         
        }
      } catch (error) {
        
      }
  }

  return (
    <div class="container" style={{ backgroundColor: '#202020' }} >
        <Header/>
        <TextContainer style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'
    ,flexDirection:'column'}}>
             <DiaryCard>
                <DiaryHeader>
                    <Typography variant="subtitle2" color="textSecondary">
                    {currentDate}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                    {userName}
                    </Typography>
                </DiaryHeader>
                <DiaryTextArea
                    id="diary-entry"
                    label="Write here..."
                    multiline
                    rows={10}
                    variant="outlined"
                    value={diaryText}
                    onChange={e => setDiaryText(e.target.value)}
                />
                {/* Add a save button or any other actions here */}
                <ViewButton variant="contained" onClick={handleSave}>Save Diary</ViewButton>
            
            </DiaryCard>
        </TextContainer>
           
        <Footer/>
    </div>
  );
};

export default DiaryPage;