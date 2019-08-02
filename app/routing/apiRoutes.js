var friends = require('../data/friends');

module.exports = function (app) {
  // get friends.js when directed to /api/friends
  app.get('/api/friends', function (req, res) {
    res.json(friends)
  });
  
  // request friends.js, respond with best friend match
  app.post("/api/friends", function (req, res) {

    // variable for the total difference of user score and best friend score
    var totalDifference = 0;

    // object for best friend match
    var bestMatch = {
      name: "",
      photo: "",
      friendDifferenceScore: 1000
    };

    // results of request from the middleware 
    var userData = req.body;
    var userScores = userData.scores;

    // us a map for a loop to parse the value from the options which is in string form into a number
    var b = userScores.map(function (item) {
      // return value as integers
      return parseInt(item, 10);
    });

    // object for user input data
    userData = {
      "name": req.body.name,
      "photo": req.body.photo,
      // parsed values from input
      "scores": b
    };

    // add up users value numbers using the reduce function
    var sumOfUserScore = b.reduce((a, b) => a + b, 0);  

    // loop through friends database
    for (var i = 0; i < friends.length; i++) {

      // total difference starts at 0 inside the loop each time
      totalDifference = 0;

      // loop through the each friend scores and add them together using reduce function
      var bestFriendScore = friends[i].scores.reduce((a, b) => a + b, 0);   

      // total difference take the user inputs sum and subtracts the friends sum
      totalDifference += Math.abs(sumOfUserScore - bestFriendScore);

      // If the sum of differences is less then the differences of the current "best match"
      if (totalDifference <= bestMatch.friendDifferenceScore) {
        // push the new friend with closest match to the bestMatch object
        bestMatch.name = friends[i].name;
        bestMatch.photo = friends[i].photo;
        bestMatch.friendDifferenceScore = totalDifference;
      };
    };

    // push the user data to the friends list
    friends.push(userData);
    console.log("=======================");
    console.log("New User added:", userData.name);
    console.log("User Score is:", sumOfUserScore);
    console.log("=======================");
    console.log("your best friend is:", bestMatch.name);
    console.log("=======================");
    console.log(bestMatch.name, "'s difference in score from", userData.name, "'s is:" );
    console.log(totalDifference);
    console.log("=======================\n");
    // res will be used for the ajax call for the modal popup
    res.json(bestMatch);
  });
};
