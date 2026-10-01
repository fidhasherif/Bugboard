   require("dotenv").config();
   const express = require("express");
   const mongoose = require("mongoose");

   const app = express();
   app.use(express.json());
   app.use("/api/auth", require("./routes/auth"));

   app.get("/", (req, res) => {
     res.send("Hello from BugBoard!");
   });

   mongoose
     .connect(process.env.MONGO_URI)
     .then(() => {
       console.log("MongoDB connected");
       app.listen(5001, () => {
         console.log("Server running on port 5001");
       });
     })
     .catch((err) => console.error("Connection error:", err.message));

