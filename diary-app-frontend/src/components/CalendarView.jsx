import  React, { useState } from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { styled } from '@mui/system';

const StyledCalendar = styled(DateCalendar)(({ theme }) => ({
    background:'white',
    marginTop:'50px'
  }));

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString();
  };


const CalendarView = (props) =>{
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newDate) => {
    setSelectedDate(formatDate(newDate));
    props.onDateData(formatDate(newDate))
  };
  

  return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledCalendar onChange={handleDateChange}/>
        </LocalizationProvider>
  );
}

export default CalendarView