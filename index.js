const express = require("express")
const cors = require("cors")
const app = express()
const mongodb = require("mongodb")
const mongoClient = mongodb.MongoClient;
const dotenv = require("dotenv").config()
const URL = process.env.DB

app.use(cors({
    // origin:"http://localhost:3000",
    origin:"*",
}))

app.use(express.json())

app.post("/paginationlist",async(req,res)=>{
    try{
        const connection = await mongoClient.connect(URL)
        const db = connection.db("pagination")
        const pagination = await db.collection("datalist").insertOne(req.body)
        res.json({message:"data created"})
        await connection.close()
    }catch(error){
        res.status(500).json({message:"something went wrong"})
    }
})

app.get("/getdata",async(req,res)=>{
    try{
        const connection = await mongoClient.connect(URL)
        const db = connection.db("pagination")
        const getdata = await db.collection("datalist").find().toArray()
        res.json(getdata)
        await connection.close()
    }catch(error){
        res.status(500).json({message:"something went wrong"})
    }
})

app.listen(4000)