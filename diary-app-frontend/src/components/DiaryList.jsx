import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Container, colors,Button } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Link} from 'react-router-dom';
import apis from '../apis';
import { useParams } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme, isActiveCard }) => ({
  margin:'20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
 
  height: isActiveCard ? '320px' : '280px',
  
  transition: 'height 0.3s ease-in-out',
}));

const ViewButton = styled(Button)(() => ({
  display: 'flex',
  background: '#202020'
}));




const DiaryList = () => {

  const [diaries,setDiaries] = useState([]);



  useEffect(()=>{
    const fetchData = async () => { 
      try{
        const response = await apis.get('/')
        
        setDiaries(response.data.data.diaries);
        console.log(response)
      }catch(error){
        console.error(error)
      }
    }

    fetchData()
  },[])

//   const handleDelete = async (e,id) =>{
//     e.stopPropagation()
//     try{
//         const response = await RestaurantFinder.delete(`/${id}`)
//         setRestaurants(restaurants.filter(restaurant => {
//             return restaurant.id !== id
//         }))
//         console.log(response)

//     }catch(err) {

//     }
// }

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



  const [activeIndex, setActiveIndex] = useState(1);

  const handleAfterChange = (index) => {
    setActiveIndex(index);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: diaries.length,
    slidesToScroll: 1,
    outerWidth:100,
    centerMode: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 1000,
    // initialSlide: 1,
    afterChange: handleAfterChange,
  };

  return (

    <Slider {...sliderSettings}  >
      {diaries.map((diary, index) => (
      
        <div key = {diary.id}>
            <StyledCard isActiveCard={index === activeIndex}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {diary.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {diary.text}
                </Typography>  
                 
                    <ViewButton variant="contained">
                      <Link to={`/diary/${index}`} style={{textDecoration: 'none',}} >
                      Open Diary 
                      </Link>
                    </ViewButton>
                    <ViewButton onClick={() => handleDelete(diary.id)} variant="contained" >
                      <Link  style={{textDecoration: 'none',}} >
                      Delete 
                      </Link>
                    </ViewButton>
               
               
              </CardContent>
            </StyledCard> 
       
       </div>
          
      ))}
    </Slider>
   
  );
};

export default DiaryList;
