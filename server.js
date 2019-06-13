// 3rd packages
const express = require("express");
const mongoose = require("mongoose");


/* my packages */


/* connect to DB */ 
mongoose.connect("mongodb://localhost:27017/fs04-xedike", {useNewUrlParser: true})
.then(() => console.log("Connected to DB"))
.catch(err => console.log(err))

const app = express();


/* middle ware */
// parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// router
app.use("/api/users", require("./routes/api/users"))


const port = process.env.PORT || 1270;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})