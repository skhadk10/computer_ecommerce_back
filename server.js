const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { readdirSync } = require( "fs")
// const bodyPaser = require("bodyPaser");
const cors = require("cors");
require("dotenv").config();

// app
const app = express();
// Parse JSON bodies
app.use(express.json());
// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Db connected"))
  .catch((err) => console.log("DB connection error: ", err));

//   middleware
app.use(morgan('dev'));
// app.use(bodyParser.json({limit:'2mb'}));
app.use(cors())

// route
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// port
const port=process.env.PORT || 8000

app.listen(port,()=>console.log(`Server is running on ${port}`))