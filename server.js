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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE,');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// static
app.use("/uploads", express.static("uploads"));

// router
app.use("/api/users", require("./routes/api/user/"))
app.use("/api/trips", require("./routes/api/trips"))


const port = process.env.PORT || 1270;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})