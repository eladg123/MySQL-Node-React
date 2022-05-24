const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config()
const authRouter = require('./routes/authRoute')

app.use(cors());
app.use(express.json())





app.use('/', authRouter);



app.listen(3001, () => {
    console.log('Server is running')
})