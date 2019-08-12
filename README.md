# Friend-Finder-5000
A survey app build with <a href="https://expressjs.com/" target="blank"><b>Express</b></a> for server communication,
<a href="https://nodejs.org/en/" target="blank"><b>Node.js</b></a> for backend javascript,
<a href="https://getbootstrap.com" target="blank"><b>Bootstrap</b></a> for styling the site
and <a href="https://jquery.com/" target="blank"><b>jQuery</b></a> for populating HTML elements.
The site is deployed onto the internet using the <a href="https://dashboard.heroku.com/apps" target="blank"><b>Heroku Cloud App</b></a>.

<a href="https://friend-finder5000.herokuapp.com" target="blank">*Complete a quick survey and find your new best friend*</a>
<hr>

## How the app works:

1. The user is asked 10 questions with a rating between 1-5 

2. When the submit button is clicked a post method is used using express and the server.
    * `app.post("/api/friends", function (req, res) {`

3. The values of each score are added together to generate a total score for the user

    * example: `user.scores = [1, 2, 4, 2, 3, 4, 5, 2, 1, 5]` using the reduce function returns an array of `var sumOfUserScore = [29]` 
    
4. The friends list (which is located in `friends.js` file in the data folder) is then looped through. The friends score is calculated like the users score. `var bestFriendScore = friends[i].scores.reduce((a, b) => a + b, 0);` <br>

 
5. The total difference in score is then calculated by subtracting the sum of the users score minus the best friends score<br>
    * `totalDifference += Math.abs(sumOfUserScore - bestFriendScore);` 
6. Next, if the calculated total difference is less than the total score of the next friends reduced score, the friend with the lower score is pushed to a best friends object with their name, picture and the new total difference between friends.

    * ``` 
        if (totalDifference <= bestMatch.friendDifferenceScore) {
        // push the new friend with closest match to the bestMatch object
        bestMatch.name = friends[i].name;
        bestMatch.photo = friends[i].photo;
        bestMatch.friendDifferenceScore = totalDifference;
      }; 
      ```
    
7. We then end the loop and push the user data to the friends list
    * `friends.push(userData);`
    
8. The best matching friend is returned as a response to populate the modal popup with a ajax request, and we end the post request
    * `res.json(bestMatch);
      }); `
      
## Example modal popup
<img src="app/public/images/modal-example.png" width="200"><br>

Best friends images generated using <a href="https://thispersondoesnotexist.com/">thispersondoesnotexist.com</a>
