const express=require("express");

const app = express();
app.use(express.json());

const connect = require("./config/db")


const usercontroller = require("./controllers/user.controller");
const topiccontroller = require("./controllers/topic.controller");
const studentcontroller = require("./controllers/student.controller");
const evaluationcontroller = require("./controllers/evaluation.controller");

app.use("/users", usercontroller);
app.use("/students", studentcontroller);
app.use("/evaluations", evaluationcontroller);
app.use("/topics", topiccontroller);


app.listen(2446, () => {
    connect();
    console.log("listening 2446")
})



