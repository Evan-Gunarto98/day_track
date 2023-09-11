const express = require('express');
const app = express();
const db = require("./db")
const cors = require('cors');

// Add your API routes here
app.use(cors());
app.use(express.json())

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/api/v1/diaries",async(req,res)=>{
  try{
    const { rows } = await db.query("SELECT * FROM diaries");
    
    res.status(200).json({
      status: 'success',
      results: rows.length,
      data: {
        diaries: rows,
      }
    })
    
  }catch(error){

  }
});


app.get("/api/v1/diaries/user",async(req,res)=>{
  try{
    const { rows } = await db.query("SELECT * FROM users");
    
    res.status(200).json({
      status: 'success',
      results: rows.length,
      data: {
        diaries: rows,
      }
    })
    
  }catch(error){
    console.log(error.message)
  }
});

app.get("/api/v1/diaries/:id",async(req,res)=>{
  try {
    const {id} = req.params;
    const databaseId = parseInt(id) + 1
    const {rows} = await db.query(
        `SELECT * FROM diaries WHERE id = $1`,[databaseId]
    );
    res.status(200).json({
    status:'success',
    results:rows.length,
    data:{
      diaries: rows[0]
    }
    })

    
  } catch (error) {
    console.log(error.message)
  }
})



app.post("/api/v1/diaries/save",async(req,res)=>{
  try{
    const {date,text} = req.body;
    const newDiary = await db.query(
      "INSERT INTO diaries (date,text) VALUES ($1,$2) RETURNING *",[date,text]
    );

    res.status(201).json({
      status: 'success',
      data: {
        diary: newDiary.rows[0],
      },
    });
    
  }catch(error){
    console.log(error.message)
  }
})



app.put("/api/v1/diaries/save/:id",async(req,res)=>{
  try{
    const {id} = req.params;
    const {text} = req.body;
    const databaseId = parseInt(id) + 1
    // "UPDATE TODO SET description = $1 WHERE todo_id = $2",[description,id]
    const newDiary = await db.query(
      "UPDATE diaries SET text = $1 WHERE id = $2 returning *",[text,databaseId]
    );

    res.status(201).json({
      status: 'success',
      data: {
        diary: newDiary.rows[0],
      },
    });
    
  }catch(error){
    console.log(error.message)
  }
})

app.delete("/api/v1/diaries/:id",async(req,res)=>{
  try {
      const {id} = req.params;
      const databaseId = parseInt(id) + 1
   
      const deleteDiary = await db.query(
          "DELETE FROM diaries WHERE id = $1",[databaseId]
      );
      
      res.status(201).json({
        status: 'success',
        data: {
          diary: deleteDiary.rows[0],
        },
      });
  } catch (error) {
    console.log(error.message)
  }
});