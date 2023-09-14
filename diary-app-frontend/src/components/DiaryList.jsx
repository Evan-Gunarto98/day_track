// import React, { useEffect, useState,useRef } from 'react';
// import { Card, CardContent, Typography, Container, colors,Button, ListItemSecondaryAction } from '@mui/material';
// import { styled } from '@mui/system';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import {Link} from 'react-router-dom';
// import apis from '../apis';
// import { useParams } from 'react-router-dom';

// const StyledCard = styled(Card)(({ theme, isActiveCard }) => ({
//   margin:'20px',

//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   transition: 'height 0.2s ease-in-out',
// }));

// const ViewButton = styled(Button)(() => ({
//   display: 'flex',
//   background: '#202020',

// }));

// const ButtonLink = styled(Link)(() => ({
//   textDecoration: 'none',
//  color:'white'
// }));



// const DiaryList = (props) => {

//   const [diaries,setDiaries] = useState([]);
//   const propData = props.calendarData;
//   const [selectedDate,setSelectedDate] = useState('');
//   const [selectedSlide,setSelectedSlide] = useState(0);
  
//   const sliderRef = useRef(null)

//   const countDatabaseId = (selectedDateId) => {
//     const startDatabaseId = Math.min(...diaries.map(diary => diary.id))
//     setSelectedSlide(selectedDateId-startDatabaseId)
//     console.log(selectedSlide)
//   }

//   const findSelectedDate = (selectedDate) => {
//     // console.log(selectedDate)
//     const found = diaries.find(diary => diary.date === selectedDate)
//     return found.id;
//   }


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await apis.get('/');
//         const diariesData = response.data.data.diaries;
//         setDiaries(diariesData);
  
//         // Set selectedDate initially from props
//         setSelectedDate(propData);
  
//         // Calculate the selected slide based on selectedDate
//         const startDatabaseId = Math.min(...diariesData.map(diary => diary.id));
//         const selectedDateId = findSelectedDate(selectedDate);
//         setSelectedSlide(selectedDateId - startDatabaseId);
  
//         console.log(selectedSlide); // This may still log an outdated value due to the asynchronous state update
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     fetchData()
//   },[props,selectedSlide])

//   const handleDelete = async(id) =>{
//     // e.stopPropagation()
//       try {
       
//           const response = await apis.delete(`/${id}`)
        
                      
//         // setDiaries(diaries.filter(diary=>{
//         //   return diary.id !== id
//         // }))
//         console.log(id)
//         setDiaries(diaries.filter(x => x.id!==id
//         ))
      
//       } catch (error) {
//         console.error(error)
//       }
//   }

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const formatText = (text) => {
//     if(text.length>100){
//       text = text.slice(0,100)+'...'
//       console.log(text.length)
//     }
//     return text
//   }

  

//   // const handleAfterChange = (index) => {
//   //   setActiveIndex(114)
//   // };

//   const sliderSettings = {
//     dots: false,
//     infinite:diaries.length > 3 ,
//     speed: 1000,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     outerWidth:100,
//     // centerMode:true,
//     // focusOnSelect: true,
//     // autoplay: true,
//     autoplaySpeed: 1000,
//     initialSlide: selectedSlide,
//     // beforeChange: handleAfterChange,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 1008,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
  
//     ],
//   };

//   return (

//     <Slider ref={sliderRef} {...sliderSettings}  >
//       {diaries.map((diary, index) => (
      
//         <div key = {diary.id}>
//             <StyledCard >
//               <CardContent>
//                 <Typography variant="h6" component="div">
//                   {formatDate(diary.date)}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {formatText(diary.text)}
//                 </Typography>  
                 
//                     <ViewButton variant="contained">
//                       <ButtonLink to={`/diary/${diary.id}`} style={{textDecoration: 'none',}} >
//                       Open Diary 
//                       </ButtonLink>
//                     </ViewButton>
//                     <ViewButton onClick={() => handleDelete(diary.id)} variant="contained" >
//                       <ButtonLink  style={{textDecoration: 'none',}} >
//                       Delete 
//                       </ButtonLink>
//                     </ViewButton>
               
               
//               </CardContent>
//             </StyledCard> 
       
//        </div>
          
//       ))}
//     </Slider>
   
//   );
// };

// export default DiaryList;
import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import apis from '../apis';
import debounce from 'lodash/debounce';

const StyledCard = styled(Card)(({ theme, isActiveCard }) => ({
  margin: '20px',
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
  color: 'white',
}));

const DiaryList = (props) => {
  const [diaries, setDiaries] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false); 
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
    // Find the index of the diary that matches the selected date
    const selectedIndex = diaries.findIndex((diary) => diary.date === propData);
    console.log(selectedIndex)
    
    if (selectedIndex !== activeSlide && !isAnimating) {
      setIsAnimating(true); // Set the animation flag
      // Set the active slide based on the selected index
      if (selectedIndex !== -1 && sliderRef.current) {
        sliderRef.current.slickGoTo(selectedIndex);
        setActiveSlide(selectedIndex);
      }
      // Use a timeout to clear the animation flag after the animation completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 200); // Adjust the timeout duration as needed
    }
 
    // Set the active slide based on the selected index
    if (selectedIndex !== -1 && sliderRef.current) {
      sliderRef.current.slickGoTo(selectedIndex);
      setActiveSlide(selectedIndex+1);
    }
  }, [propData, diaries,activeSlide,isAnimating]);

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
    <Slider ref={sliderRef} {...sliderSettings}>
      {diaries.map((diary, index) => (
        <div key={diary.id}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" component="div">
                {formatDate(diary.date)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatText(diary.text)}
              </Typography>

              <ViewButton variant="contained">
                <ButtonLink to={`/diary/${diary.id}`} style={{ textDecoration: 'none' }}>
                  Open Diary
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