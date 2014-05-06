1. HistoryDetailCtrl

Get player Info
GET /playerInfo?playerId=...&targetId=......&accessSignature=......
if playerId is not correct
return:
{
	“error” : “WRONG_PLAYER_ID”
}
if playerId can not correspond to accessSignature
return:
{
	“error” : “WRONG_ACCESS_SIGNATURE”
}

if targetId is incorrect
return
{
	“error”: “WRONG_TARGET_ID”
}

if target is the same with playerId
return:
{
	“email” : …,
	“firstname” : …,
	“lastname” : …,
	“nickname” : ….,
           “imageURL”: “http://www.foo-bar.com/profilepic.gif”
}
if not
return:
{
	“firstname” : …,
	“nickname” : ….,
          “imageURL”: “http://www.foo-bar.com/profilepic.gif”
}


2.HistoryDetailCtrl

Get a detail player history for each game of a player
 GET /history?playerId=......&targetId=....&gameId=.....&accessSignature=...
if playerId can not correspond to accessSignature
return:
{
	“error” : “WRONG_ACCESS_SIGNATURE”
}

if targetId is incorrect
return
{
	“error”: “WRONG_TARGET_ID”
}

if gameId is incorrect:
return
{“error” : “WRONG_GAME_ID”}

if playerId is incorrect:
return
{“error” : “WRONG_PLAYER_ID”}

if both are correct: 
return
{
	“history” : 
[
{”date” : …, “result” : …, “tokenChange” : …., “score” : ….., “opponentIds” : []}, 
{”date” : …, “result” : …, “tokenChange” : …., “score” : ….., “opponentIds” : []},
{”date” : …, “result” : …, “tokenChange” : …., “score” : ….., “opponentIds” : []}]
}
targetId must be the same to playerId to get a non-empty result.



3 HistoryDetailCtrl

Get player Info
GET /playerInfo?playerId=...&targetId=......&accessSignature=......
if playerId is not correct
return:
{
	“error” : “WRONG_PLAYER_ID”
}
if playerId can not correspond to accessSignature
return:
{
	“error” : “WRONG_ACCESS_SIGNATURE”
}

if targetId is incorrect
return
{
	“error”: “WRONG_TARGET_ID”
}

if target is the same with playerId
return:
{
	“email” : …,
	“firstname” : …,
	“lastname” : …,
	“nickname” : ….,
           “imageURL”: “http://www.foo-bar.com/profilepic.gif”
}
if not
return:
{
	“firstname” : …,
	“nickname” : ….,
          “imageURL”: “http://www.foo-bar.com/profilepic.gif”
}









1. Get a player’s entire gaming Info/token/score
Get /playerAllGame?playerId=...&targetId=...&accessSignature=...

Success call return: //number might vary
{
 "123":
{"draw":"1","RANK":"1500","lost":"0","token":"1","score":"47","win":"0"},
"12323":
{"draw":"0","RANK":"1516","lost":"0","token":"3","score":"43","win":"1"}
}
The key is game id.


if playerId can not correspond to accessSignature
return:
{
	“error” : “WRONG_ACCESS_SIGNATURE”
}

if playerId is incorrect:
return
{“error” : “WRONG_PLAYER_ID”}

if targetId is incorrect
return
{
	“error”: “WRONG_TARGET_ID”
}

Getting a User info
GET /userinfo/{userId}?accessSignature=... 
If the userId exists, then it will return the user info
{
  “email”: “developer123@gmail.com”,
  “firstName”: “Leonardo”,  // optional
  “middleName”: “M”,  // optional
  “lastName”: “Turtle”,  // optional
  “nickname”: “Leo”  // optional,
  “imageURL”: “http://foo-bar.com/bar.gif”
}
If the userId is incorrect, then it returns: 
{
  “error”: “WRONG_USER_ID”
}
If the accessSignature is incorrect, then it returns: 
{
  “error”: “WRONG_ACCESS_SIGNATURE”
}


1.HistoryListCtrl

Get /playerAllGame?playerId=...&targetId=...&accessSignature=...

Success call return: //number might vary
{
 "123":
{"draw":"1","RANK":"1500","lost":"0","token":"1","score":"47","win":"0"},
             "12323":
{"draw":"0","RANK":"1516","lost":"0","token":"3","score":"43","win":"1"}
}
The key is game id.


if playerId can not correspond to accessSignature
return:
{
	“error” : “WRONG_ACCESS_SIGNATURE”
}

if playerId is incorrect:
return
{“error” : “WRONG_PLAYER_ID”}

if targetId is incorrect
return
{
	“error”: “WRONG_TARGET_ID”
}

2.HistoryListCtrl 
Get player gaming Info/token/score
Get /playerGame?playerId=......&gameId=......&targetId=...&accessSignature=...

Success call return: //number might vary
{
"draw":"0",
"lost":"0",
"token":"0",
"score":"0",
"win":"0",
“rank”:0,
}

if playerId can not correspond to accessSignature
return:
{
	“error” : “WRONG_ACCESS_SIGNATURE”
}

if gameId is incorrect:
return
{“error” : “WRONG_GAME_ID”}

if playerId is incorrect:
return
{“error” : “WRONG_PLAYER_ID”}

if targetId is incorrect
return
{
	“error”: “WRONG_TARGET_ID”
}

3.HistoryListCtrl
Get a detail player history for each game of a player
 GET /history?playerId=......&targetId=....&gameId=.....&accessSignature=...
if playerId can not correspond to accessSignature
return:
{
	“error” : “WRONG_ACCESS_SIGNATURE”
}

if targetId is incorrect
return
{
	“error”: “WRONG_TARGET_ID”
}

if gameId is incorrect:
return
{“error” : “WRONG_GAME_ID”}

if playerId is incorrect:
return
{“error” : “WRONG_PLAYER_ID”}

if both are correct: 
return
{
	“history” : 
[
{”date” : …, “result” : …, “tokenChange” : …., “score” : ….., “opponentIds” : []}, 
{”date” : …, “result” : …, “tokenChange” : …., “score” : ….., “opponentIds” : []},
{”date” : …, “result” : …, “tokenChange” : …., “score” : ….., “opponentIds” : []}]
}
targetId must be the same to playerId to get a non-empty result.
