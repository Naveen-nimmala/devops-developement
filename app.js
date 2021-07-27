const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const cors = require('cors');
dotenv.config();

//Bring Routers
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')



//DB
mongoose.connect(process.env.MONGO_URI,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(function(){
    console.log("DB connceted")
  }).catch((error) => console.log(error))



//Middleware
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
  extended: true
}));
app.use(morgan('dev'));
app.use(expressValidator());
app.use(cors());
app.use(cookieParser());


app.use("/", postRoutes); 
app.use("/", authRoutes); 
app.use("/", userRoutes); 
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: "Unauthorized"});
  }
});


const port = process.env.PORT || 8080

app.listen(port, () =>{
    console.log(`Node Js Started with port ${port}`)
}); 