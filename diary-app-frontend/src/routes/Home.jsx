import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Container } from '@mui/material';
import '../App.css'
import DiaryList from '../components/DiaryList';
import CalendarView from '../components/CalendarView';
import AddDiaryButton from '../components/AddDiaryButton';


const Home = () => {
  return (
  

    <div  style={{
       backgroundColor: '#202020' 
        ,display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
       }} >
    <Header/>
      <div className='container'>  
      
        <DiaryList/>
        <AddDiaryButton/>
        <CalendarView/> 
        
      </div>
     <Footer/> 
      
    </div>
  
  )
}

export default Home