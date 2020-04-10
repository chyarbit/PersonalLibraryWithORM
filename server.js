const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api', require('./controllers/apiRoutes'));
app.use("/", require('./controllers/htmlRoutes'));

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`)
});