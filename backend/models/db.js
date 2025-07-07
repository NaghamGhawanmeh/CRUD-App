const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("database is ready to use");
  })
  .catch((err) => {
    console.log("err:", err);
  });
