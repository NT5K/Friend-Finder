const express = require('express');
const app = express();

// port for heroku and default port
const port = process.env.PORT || 5000;

// now we can use public and data folders
app.use(express.static(__dirname + '/app/public'));
app.use(express.static(__dirname + '/app/data'));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.json({ type: 'application/*+json' }));

// use html routes file instead of putting them here, also send it the app variable
require('./app/routing/htmlRoutes.js')(app);
require('./app/routing/apiRoutes.js')(app);

// listener for console
app.listen(port, () => console.log(`listening on port ${port}!`));
