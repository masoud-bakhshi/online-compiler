const express = require("express");
const app = express();
const Submitrouter = require("./routes/routes");
const cors = require("cors");
var compression = require("compression");
var RateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
dotenv.config();
const port = 1991;
app.use(compression());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
//*****************************************DDOs Prevent */
app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

var limiter = new RateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
});

//  apply to all requests
app.use(limiter);
//***************************************** */

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static("./client/build"));

app.use("/api/v1", Submitrouter);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
