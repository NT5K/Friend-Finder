var path = require('path');

module.exports = function (app) {
  app.get('/', function (req, res) {
    console.log('This is the homepage\n')
    res.sendFile(path.join(__dirname, '/../public/html/home.html'))
  });

  app.get('/survey', function (req, res) {
    console.log('This is the survey Page\n')
    res.sendFile(path.join(__dirname, '/../public/html/survey.html'))
  });
  
};
