
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const createDatabase = require('./config/db'); 
const adminAuthRoutes = require('./routes/adminAuthRoute');
const userAuthRoutes = require('./routes/userAuthRoute');
const commonRoutes = require('./routes/commonRoute');
const { v4 } = require('uuid');

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

module.exports = app;
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  next();
});
app.use(cors(
  {
    origin:["https://hansrajsaini.vercel.app/"],
    methods:["POST","GET"],
    Credential:true
  }
))


(async () => {
  try {
    const { client, database } = await createDatabase(); 
    app.locals.mongoClient = {client,database};
    app.locals.db = database;

    app.use('/adminAuth', adminAuthRoutes);
    app.use('/userAuth', userAuthRoutes);
    app.use('/common', commonRoutes);

    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something went wrong!');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error setting up the server:', error);
  }
})();
