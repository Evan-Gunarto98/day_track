import  React from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { styled } from '@mui/system';

const StyledCalendar = styled(DateCalendar)(({ theme }) => ({
    background:'white',
    marginTop:'50px'
  }));
  

const CalendarView = () =>{
  return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledCalendar />
        </LocalizationProvider>
  );
}

export default CalendarView