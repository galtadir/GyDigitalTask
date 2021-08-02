const express = require("express"); 
const bodyParser = require("body-parser");

const app = express()
const domian = require('./routes/domain')

app.use(bodyParser.json())
app.use("/domian",domian)

app.listen(3000, () => {
    console.log(`app listening on port 3000`);
});



