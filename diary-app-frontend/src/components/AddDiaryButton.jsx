import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import apis from '../apis';

const AddButton = styled(Button)(() => ({
  display: 'flex',
  background: '#FFFFFF'
}));

const AddDiaryButton = () => {
  const [ttldiaries, setTtlDiaries] = useState([]);
  const currentDate = new Date().toLocaleDateString();

  // const handleSave = async () => {
  //   try {
  //     await apis.post('/save', {
  //       date: currentDate,
  //       text: ''
  //     });

  //     // Fetch the updated list of diaries
  //     const response = await apis.get('/');
  //     setTtlDiaries(response.data.data.diaries);

  //     // Navigate to the newly created diary
  //     const newlyCreatedDiary = response.data.data.diaries[0];
  //     if (newlyCreatedDiary) {
  //       window.location.href = `/diary/${newlyCreatedDiary.id}`;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apis.get('/');
        setTtlDiaries(response.data.data.diaries);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div style={{
        marginTop: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <AddButton>
          <Link to={'/add'}>
          YOLOE
          </Link>
          
        </AddButton>
      </div>
    </div>
  )
}

export default AddDiaryButton;
