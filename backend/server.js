const express = require('express');
const app = express();
const notes = require('./data/notes');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5001;
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const notFound = require('./middlewares/errorMiddlewares');
const errorHandler = require('./middlewares/errorMiddlewares');


// Middleware/ App in use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Router
app.get('/', (req, res)=> {
    res.send('Api is running...')
})

app.get('/api/notes', (req, res)=>{
    res.send(notes);
})
app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);



// MongoDB Connect
const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB is Connected")
    } catch (error) {
        throw error
    }
}
mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB disconnected!")
})
mongoose.connection.on("connected", ()=>{
    console.log("MongoDB Connected!")
})


// App Listen
app.listen(PORT, ()=> {
    connect();
    console.log(`server started on port ${PORT}`)
})