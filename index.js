// const express = require('express')
import express from "express"
const app = express()
const port = 8000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get("/google-drive", (req, res) => {
    // console.log("deepu");
    res.send("hello deepu")
})