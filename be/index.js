const express = require('express');
const mongoose = require('mongoose');
// Allows us to control app's Cross origin Resource Sharing settings
const cors = require('cors')

// Routes
const userRoutes = require('./routes/user')
const resultRoutes = require('./routes/result')

// Server setup
const app = express();
const port = 4000;

app.use(cors())




app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/users', userRoutes)
app.use('/api/result', resultRoutes)


mongoose.connect("mongodb+srv://brands27:nevermore27@cluster0.eteec.mongodb.net/Betting-App?retryWrites=true&w=majority", {
	useNewUrlparser: true,
	useUnifiedTopology: true
});

let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"))
db.once("open",() => console.log("We're connected to the cloud database"))


app.listen(process.env.PORT || port, ()=>console.log(`Now listens to port ${process.env.PORT || port}`))      
