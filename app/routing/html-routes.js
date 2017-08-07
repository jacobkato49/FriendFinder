//using friendData from javascript file
const friendData = require("../data/friend");

module.exports = function(app){

  //get request is made to this route
  app.get("/api/friends", function(req,res){
    //response is in a json with friendData
    res.json(friendData);
  })

  //post request made to this route
  app.post("/api/friend", function(req,res){
    var newFriend= req.body;


    //might have to fix all these nested for-loops (find cleaner way to write code)
    for(var i=0; i<newFriend.scores.length; i++){

      if(newFriend.scores[i] === "1 (Strongly Disagree)"){
        newFriend.scores[i] =1;
      }
      else if(newFriend.scores[i] === "5 (Strongly Agree)"){
        newFriend.scores[i] =5;
      }
      else{
        newFriend.scores[i] = parseInt(newFriend.scores[i]);
      }
    }

    //put players score within an array
    var diff = [];

    for(var d=0; d<friendData.length; d++){

      var compared = friendData[d];
      var totalDiff = 0;

      for(var a=0; a< compared.scores.length; a++){
        var scoreDiff = Math.abs(compared.scores[a]- newFriend.scores[a]);
        totalDiff += scoreDiff;
      }

      diff[a]= totalDiff;
    }

    var newBestFriendNum = diff[0];
    var bestFriendIndex = 0;

    console.log(newBestFriendNum);
    
    for(var k=1; k<diff.length; k++){
      if(diff[k] < bestFriendIndex){
        newBestFriendNum = diff[k];
        bestFriendIndex = k;
      }
    }


    friendData.push(newFriend)

    res.json(friendData[bestFriendIndex]);
  })
}
