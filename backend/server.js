const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDatabase = require('./config/db')
connectToDatabase()
const app = express();

// routes middleware 
const adminRoutes = require('./routes/adminRoutes')
const teacherRoutes = require('./routes/teacherRoutes')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// routes 
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);


const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
    console.log(`Server is running at port no ${PORT}`)
})