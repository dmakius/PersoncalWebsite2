import mongoose from "mongoose";
import dotenv  from "dotenv";
import app from "./server.js";

dotenv.config();

// const mongoString = `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.kixmdnb.mongodb.net/?retryWrites=true&w=majority`

// mongoose.connect(mongoString,  {
//     useNewUrlParser: true
//   });

// const connection = mongoose.connection;

// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

// connection.on("error",(error)=>{
//   console.log("Cant connect to DB");
//   //console.log(error);
// });
const port = process.env.PORT || 8080;
app.listen(port);

