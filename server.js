const app = require("./app.js")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({})

const PORT = process.env.PORT || 8080

const connectDB = async () => {
    try{
        const db = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connected to ${db.connection.host}`)
    } catch(error) {
        console.log(`Error connecting to DataBase: ${error.message}`)
    }
}

app.listen(PORT, () => {
    console.log(`Server connected to Port ${PORT}`)
    connectDB()
})
