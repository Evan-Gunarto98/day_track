
import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import apis from '../apis';
import debounce from 'lodash/debounce';

const StyledSlider = styled(Slider)(() => ({

}))

const StyledCard = styled(Card)(({ theme, isActiveCard }) => ({
 

  margin: '20px',
  
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'height 0.2s ease-in-out',
}));

const ViewButton = styled(Button)(() => ({
  marginTop:'10px',
  display: 'flex',
  background: '#202020',
}));

const ButtonLink = styled(Link)(() => ({
  
  textDecoration: 'none',
  color: 'white',
}));

const DiaryList = (props) => {
  const [diaries, setDiaries] = useState([]);
  const propData = props.calendarData;

  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apis.get('/');
        setDiaries(response.data.data.diaries);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    
    const selectedIndex = diaries.findIndex((diary) => diary.date === propData);
    console.log(selectedIndex)

    if (selectedIndex !== activeSlide) {
      if (selectedIndex !== -1 && sliderRef.current) {
        sliderRef.current.slickGoTo(selectedIndex);
      }
    }
  }, [propData, diaries, activeSlide]);
  

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatText = (text) => {
    if (text.length > 100) {
      text = text.slice(0, 100) + '...';
    }
    return text;
  };

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
  
const handleBeforeChange = debounce((current, next) => {
  console.log('Before change - current:', current, 'next:', next);
  setActiveSlide(next);
}, 200); //

  const sliderSettings = {
    
    dots: false,
    infinite: diaries.length > 3,
    speed: 500,
    slidesToShow: 3,
    centerMode:true,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 1000,
    beforeChange: handleBeforeChange,
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
    <StyledSlider ref={sliderRef} {...sliderSettings} >
      {diaries.map((diary, index) => (
        <div key={diary.id}> 
          <StyledCard>
            <CardContent>
              <Typography variant="h6" component="div">
                {formatDate(diary.date)}
              </Typography>
              <Typography variant="body2" >
                {formatText(diary.text)}
              </Typography>

              <ViewButton variant="contained">
                <ButtonLink to={`/diary/${diary.id}`} style={{ textDecoration: 'none' }}>
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
    </StyledSlider>
  );
};

export default DiaryList;