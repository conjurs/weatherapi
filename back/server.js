const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();
const port = 3007;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);
app.use('/weather', weatherRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
