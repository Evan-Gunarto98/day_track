import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./routes/Home";
import LoginPage from "./routes/LoginPage"
import DiaryDetailPage from "./routes/DiaryDetailPage"
import RegisterPage from './routes/RegisterPage';

const App = () => {
    return (
      <Router>
        <Routes>
         
          <Route exact path="/" element={<Home/>} />
          {/* <Route exact path="/" element={<} */}
           <Route exact path="/login" element={<LoginPage/>} />
           <Route exact path="/diary/:id/"  element={<DiaryDetailPage/>} />
          <Route exact path="/register" element={<RegisterPage/>} />
          {/* <Route path="/diary" component={DiaryComponent} /> */} 
          {/* <Route component={NotFoundComponent} /> */}
        </Routes>
      </Router>
    );
  }
  
  
export default App;