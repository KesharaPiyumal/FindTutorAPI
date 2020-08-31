const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/config/database');
const assetsDir = require('path').join(__dirname, '/assets');
const log4js = require('log4js');


// Test mySql connection
db.authenticate()
  .then(() => console.log('MySQL FindTutor DB Connected..!'))
  .catch(err => console.log('Error: ' + err));


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

log4js.configure('./config/configLog4js.json');
app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' }));

// access to assets folder
app.use(express.static(assetsDir));

// routes for the all requests
app.use('/exam', require('./src/api/routes/examR'));
app.use('/subject', require('./src/api/routes/subjectR'));
app.use('/tutor', require('./src/api/routes/tutorR'));
app.use('/student', require('./src/api/routes/studentR'));
app.use('/user', require('./src/api/routes/common/userR'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log('Server started on PORT: ' + PORT));
