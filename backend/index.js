// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors"); // Import cors middleware
// require("dotenv").config();
// const app = express();
// const cookieParser = require("cookie-parser");
// const PORT = process.env.PORT;
// const URL = process.env.MONGO_URI;
const userRouter = require("./routes/usr-router");
const postRouter = require("./routes/post-router");
// mongoose
//   .connect(URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to the database successfully...");

//     // Create a WebSocket server
//     const server = app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//     const wss = new WebSocket.Server({ server });
//     wss.on("connection", async (ws) => {
//       //Start listening for changes to the bookings collection after successful connection
//       const changeStream = Post.watch();
//       const bookingsData = await Post.find();
//       changeStream.on("change", (data) => {
//         // send notification to the server and get it in client side
//         wss.clients.forEach((client) => {
//           client.send(JSON.stringify(data));
//         });
//       });
//     });
//   })
//   .catch((err) => console.log(err));

// // Enable CORS with credentials option and specific origin
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     credentials: true,
//   })
// );

// app.use(cookieParser());
// app.use(express.json());
// app.use("/auth", userRouter);
// app.use("/post", postRouter);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");
const Grid = require("gridfs-stream");
const multer = require("multer");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = process.env.PORT || 8060;
const URL = process.env.MONGO_URI;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database successfully...");
  });

let gfs;
mongoose.connection.once("open", () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("uploads");
});

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { buffer, originalname } = req.file;
    const writestream = gfs.createWriteStream({ filename: originalname });
    writestream.end(buffer);
    res.status(200).send("File uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/video/:filename", (req, res) => {
  const { filename } = req.params;
  const readstream = gfs.createReadStream({ filename });
  readstream.pipe(res);
});

wss.on("connection", (ws) => {
  console.log("User connected");

  // Example: Emit the video filename to the client
  const videoFilename = "your_video_filename.mp4";
  ws.send(JSON.stringify({ event: "video", filename: videoFilename }));
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Add API route to serve videos
app.get("/api/video/", (req, res) => {
  const { filename } = req.params;
  const videoPath = path.join(__dirname, "/files", "myFile-1705110319806.mp4");

  // Add logic to check if the file exists, and handle errors appropriately
  // For simplicity, assuming synchronous file reading here
  const videoFile = fs.readFileSync(videoPath);

  // Set appropriate headers for video files
  res.setHeader("Content-Type", "video/mp4");
  res.send(videoFile);
});


const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  },
});

wss.on("connection", (ws) => {
  console.log("User connected");

  // Example: Emit the video filename to the client
  const videoFilename = "your_video_filename.mp4";
  ws.send(JSON.stringify({ event: "video", filename: videoFilename }));
});

io.on("connection", (socket) => {
  socket.on("your_message", (message) => {
    socket.broadcast.emit("All", [message]);
    console.log(message);
  });

  socket.on('control_video', (control) => {
    console.log(`Received control_video event: ${control}`);
    io.emit('control_video', control);
  });
});

app.use(express.json());
app.use("/auth", userRouter);
app.use("/post", postRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
