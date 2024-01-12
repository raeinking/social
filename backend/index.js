const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors middleware
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;
const URL = process.env.MONGO_URI;
const userRouter = require("./routes/usr-router");
const postRouter = require("./routes/post-router");
const WebSocket = require("ws");

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database successfully...");

    // Create a WebSocket server
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    const wss = new WebSocket.Server({ server });
    wss.on("connection", async (ws) => {
      //Start listening for changes to the bookings collection after successful connection
      const changeStream = Post.watch();
      const bookingsData = await Post.find();
      changeStream.on("change", (data) => {
        // send notification to the server and get it in client side
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(data));
        });
      });
    });
  })
  .catch((err) => console.log(err));

// Enable CORS with credentials option and specific origin
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/auth", userRouter);
app.use("/post", postRouter);
