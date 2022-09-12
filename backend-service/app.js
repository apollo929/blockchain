const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/users");
const interventionRoutes = require("./routes/intervention");
const tierRoutes = require("./routes/tier");
const companyRoutes = require("./routes/company");

const app = express();
app.use(morgan("dev"));

mongoose
    .connect("mongodb://localhost:27017/nftdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("mongodb connected");
    })
    .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(cors());

//define Routes
app.use("/api/users", userRoutes);
app.use("/api/intervention", interventionRoutes);
app.use("/api/tier", tierRoutes);
app.use("/api/company", companyRoutes);

app.listen(5000, () => {
    console.log(`Server started port 5000`);
});
