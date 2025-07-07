const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./models/db");
app.use(cors());
app.use(express.json());
// Export Routers
const userRouter = require("./routes/users");
const roleRouter = require("./routes/roles");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

app.use("/users", userRouter);
app.use("/roles", roleRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

// app.use("*", (req, res) => res.status(404).json("No content at this path"));
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
