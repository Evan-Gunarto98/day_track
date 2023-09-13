import React, { useEffect, useState,useRef } from 'react';
import { Card, CardContent, Typography, Container, colors,Button, ListItemSecondaryAction } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Link} from 'react-router-dom';
import apis from '../apis';
import { useParams } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme, isActiveCard }) => ({
  margin:'20px',

  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'height 0.2s ease-in-out',
}));

const ViewButton = styled(Button)(() => ({
  display: 'flex',
  background: '#202020',

}));

const ButtonLink = styled(Link)(() => ({
  textDecoration: 'none',
 color:'white'
}));



const DiaryList = (props) => {

  const [diaries,setDiaries] = useState([]);
  const propData = props.calendarData;
  const [selectedDate,setSelectedDate] = useState('');
  
  const sliderRef = useRef(null)

  const countDatabaseId = () => {
    const startDatabaseId = Math.min(...diaries.map(diary => diary.id))
    console.log(startDatabaseId)
  }

  const findSelectedDate = (selectedDate) => {
    console.log(selectedDate)
    const found = diaries.find(diary => diary.id ===  120)
    console.log(found)
  }


  useEffect(()=>{
    const fetchData = async () => { 
      try{
        const response = await apis.get('/')
        
        setDiaries(response.data.data.diaries);
        // console.log(response)
        
       setSelectedDate(`${propData.$y}-${propData.$M}-${propData.$D}`)
        // console.log(props.calendarData)
        // console.log(propData)
        // console.log(selectedDate)
        // console.log(startDatabaseId)
        //  console.log(diaries)
        //  countDatabaseId()
        findSelectedDate(selectedDate);
      }catch(error){
        console.error(error)
      }
    }

    fetchData()
  },[props])

  const handleDelete = async(id) =>{
    // e.stopPropagation()
      try {
       
          const response = await apis.delete(`/${id}`)
        
                      
        // setDiaries(diaries.filter(diary=>{
        //   return diary.id !== id
        // }))
        console.log(id)
        setDiaries(diaries.filter(x => x.id!==id
        ))
      
      } catch (error) {
        console.error(error)
      }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatText = (text) => {
    if(text.length>100){
      text = text.slice(0,100)+'...'
      console.log(text.length)
    }
    return text
  }

  

  // const handleAfterChange = (index) => {
  //   setActiveIndex(114)
  // };

  const sliderSettings = {
    dots: false,
    infinite:diaries.length > 3 ,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    outerWidth:100,
    // centerMode:true,
    // focusOnSelect: true,
    autoplay: true,
    // autoplaySpeed: 1000,
    initialSlide: 0,
    // beforeChange: handleAfterChange,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1008,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
  
    ],
  };

  return (

    <Slider ref={sliderRef} {...sliderSettings}  >
      {diaries.map((diary, index) => (
      
        <div key = {diary.id}>
            <StyledCard >
              <CardContent>
                <Typography variant="h6" component="div">
                  {formatDate(diary.date)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatText(diary.text)}
                </Typography>  
                 
                    <ViewButton variant="contained">
                      <ButtonLink to={`/diary/${diary.id}`} style={{textDecoration: 'none',}} >
                      Open Diary 
                      </ButtonLink>
                    </ViewButton>
                    <ViewButton onClick={() => handleDelete(diary.id)} variant="contained" >
                      <ButtonLink  style={{textDecoration: 'none',}} >
                      Delete 
                      </ButtonLink>
                    </ViewButton>
               
               
              </CardContent>
            </StyledCard> 
       
       </div>
          
      ))}
    </Slider>
   
  );
};

export default DiaryList;
