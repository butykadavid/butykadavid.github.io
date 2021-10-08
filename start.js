const express = require('express');

const app = express();

app.listen(6969, () => console.log("Listening at port 6969"));
app.use(express.static('Page'));