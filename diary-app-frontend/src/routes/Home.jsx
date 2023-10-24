import React, { useState,useContext, createContext} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Container } from '@mui/material';
import '../App.css'
import DiaryList from '../components/DiaryList';
import CalendarView from '../components/CalendarView';
import AddDiaryButton from '../components/AddDiaryButton';

 const AppContext = createContext();

const Home = () => {
  const [dateData,setDateData] = useState('');
  const [refreshFlag, setRefreshFlag] = useState(false)
  const handleDateData = (data) => {
    setDateData(data);
    
  };

  const refreshAddDiaryButton = () =>{
    setRefreshFlag(!refreshFlag)
  }

 

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
        
        <AppContext.Provider value = {{refreshAddDiaryButton}}>
        <DiaryList calendarData={dateData}/>
        <AddDiaryButton/>
        </AppContext.Provider>
        <CalendarView onDateData={handleDateData} /> 
        
      </div>
     <Footer/> 
      
    </div>
  
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
};

export default Home

