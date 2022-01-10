const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const PORT = 8000;
app.listen(PORT, "127.0.0.1");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const DB = process.env.DB_CONNECTION;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", `${message}`);
  });
});

http.listen(8080, () => console.log("Chat app listening on 8080"));
