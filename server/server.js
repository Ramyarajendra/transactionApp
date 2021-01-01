const express = require('express');
const path = require('path')
require('dotenv').config({path: path.join(__dirname, '.env')});
const connectDB = require('./config/db')
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile')
// require('dotenv').config();

const app = express();


connectDB();

app.use(express.json({extended: false}))



app.use(authRoute);
app.use(profileRoute)

//Define Routes


// if(process.env.NODE_ENV === 'production'){
//     //Set static folder
//     app.use(express.static('client/build'))

//     app.use('*' , (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build' , 'index.html')))
// }

const PORT = process.env.PORT || 5000;
console.log('port',process.env.PORT)

app.listen(PORT , ()=> console.log(`Server on port ${PORT}`));

