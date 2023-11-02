const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require("dotenv").config();
const UserModel = require('./Models/user')

const app = express();
const PORT = process.env.PORT

// middle ware
app.use(cors({origin:true}))
app.use(express.json())



//connect to mongoDB using mongoose driver
mongoose.connect(
  "mongodb+srv://Muse:199544@cluster0.hoqixc8.mongodb.net/?retryWrites=true&w=majority"
);

app.post('/createuser',(req,res) => {
    UserModel.create(req.body).then((result) => {
        res.status(201).json(result)
    }).catch((err) => {
        res.status(500).json({message: "can't create"})
    })
});

app.get('/users',(req,res) => {
    UserModel.find({}).then((result) => {
        res.status(200).json(result)
    } ).catch((err) => {
        res.status(500).json({message: "could't fetch the data"})
    })
})

app.get("/getUserById/:id",(req,res) => {
    let id = req.params.id;
    UserModel.findById(id).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
});

app.put('/updateuser/:id',(req,res) => {
    const id = req.params.id

    UserModel.findByIdAndUpdate(id,
        {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
});


app.delete('/delete/:id',(req,res) => {
    const id = req.params.id

    UserModel.findByIdAndDelete(id)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json(err)
    })
})


// app.get('/',(req,res)=>{
//     res.status(200).json({message:"Welcome To This Api"})
// })


app.listen(PORT,()=>{
    console.log(`server listenning on ${PORT}`)
});