
var sServer = '.smg-server.appspot.com';
var sAsp;
var sQuery;
var sMethod;

var loadXMLDoc = function(sVersion, sMethod, sAsp, sQuery){
	var xmlhttp;
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}else{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange =function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var data = JSON.parse(xmlhttp.responseText);
		}
	}
		xmlhttp.open(sMethod,sVersion + sServer + '/' + sAsp + sQuery,true);
		xmlhttp.setRequestHeader('Content-Type','application/json');
		xmlhttp.send();
	}

/* Tests for Server Version 1 */
module('Tests for Server Version 1');

// Test 1: Log in correctly
var sPlayerId = '0';
var sCorrectPwd = 'correctPwd'
test('login test', function(){
    sAsp = 'players/' + sPlayerId;
	sQuery = '?password=' + sCorrectPwd;
	ok(loadXMLDoc('1', 'GET', sAsp, sQuery).accessSignature,'Log in successfully');
});

// Test 2: Log in with wrong password
var sWrongPwd = 'wrongPwd'
test('login with wrong password test', function(){
    sAsp = 'players/' + sPlayerId;
	sQuery = '?password=' + sWrongPwd;
	equals(loadXMLDoc('1', 'GET', sAsp, sQuery).error, 'WRONG_PASSWORD', 'Wrong password');
});

// Test 3: Log in with wrong playerId
var sWrongPlayerId = '10000';
var sPwd = 'pwd';
test('login with wrong playerId test', function(){
    sAsp = 'players/' + sWrongPlayerId;
	sQuery = '?password=' + sPwd;
	equals(loadXMLDoc('1', 'GET', sAsp, sQuery).error, 'WRONG_PLAYER_ID', 'Wrong playerId');
});

// Test 4: Sign up using email and password
var sNewEmail = 'new@email.com';
var sNewPlayerPwd = 'NewPlayerPwd';
test('sign up test', function(sNewEmail, sNewPlayerPwd){
	sAsp = 'players';
	sQuery = '?email=' + sNewEmail + '&password=' + sNewPlayerPwd;
    var sNewPlayerId = loadXMLDoc('1', 'POST', sAsp, sQuery).playerId;
	ok(sNewPlayerId !== null, 'Sign up successfully')
});

// Test 5: Guest choose a game and the practice mode automatically
// It is assumed that the choice information will be transferred to the Server, instead of to the Container directly
var sGameId = '1';
var sGuestId = '0000';
test('guest choose game test', function(sGameId){
    // An assumed active server page which will return a JSON object with attributes of "gameId", "modeId", etc.
	sAsp = 'game_choose.asp';  
	sQuery = '?playerId=' + sGuestId + '&gameId=' + sGameId + '&modeId=0';
	equals(loadXMLDoc('1', 'GET', sAsp, sQuery).gameId, sGameId, 'Choose game successfully');
	equals(loadXMLDoc('1', 'GET', sAsp, sQuery).modeId, '0', 'Choose practice mode automatically');
});

// Test 6: Player choose a game and mode
var sModeId = '2';
test('player choose game and mode test', function(sGameId, sModeId){
	sAsp = 'game_choose.asp';
	sQuery = '?gameId=' + sGameId + '&modeId=' + sModeId;
	equals(loadXMLDoc('1', 'GET', sAsp, sQuery).gameId, sGameId, 'Choose game successfully');
	equals(loadXMLDoc('1', 'GET', sAsp, sQuery).modeId, sModeId, 'Choose mode successfully');
});

// Test 7: List all games after adding a new game
test('add and list all games test', function(){
    // An assumed active server page which will return a JSON object with attributes of "count" and array "games[]"
	sAsp = 'list_game.asp';
	sQuery = '';
	var oOldGames = loadXMLDoc('1', 'GET', sAsp, sQuery);
    // Add a new game, the exact process will be designed by the Developer Pages Component
	var sAddGameAsp = 'games';
	var oNewGame = {
        "name": "NewGame",
        "playerIdOfGameDeveloper": "1001"
	};
	var sAddGameQuery = '?name=NewGame&playerIdOfGameDeveloper=1001';
	var sNewGameId = loadXMLDoc('1', 'POST', sAddGameAsp, sAddGameQuery).gameId;
	var iNewCount = oOldGames.count + 1;
    equals(loadXMLDoc('1', 'GET', sAsp, sQuery).games[iNewCount - 1].gameId, sNewGameId, 'Add and list games successfully');
});

// Test 8: List all games after deleting a game
var sGameId = '2';
var sAccessSignature;
test('delete and list all games test', function(){
	sAsp = 'list_game.asp';
	sQuery = '';
	var oOldGames = loadXMLDoc('1', 'GET', sAsp, sQuery);	
	// Delete a new game, the process will be designed by the Developer Pages Component
    var sDelGameAsp = 'games/sGameId';
    var sDelGameQuery = '?accessSignature=' + sAccessSignature;
    var oMsg = loadXMLDoc('1', 'DELETE', sDelGameAsp, sDelGameQuery);
    var iNewCount = oOldGames.count - 1;
    ok(loadXMLDoc('1', 'GET', sAsp, sQuery).games[iNewCount - 1].gameId !== sGameId, 'Delete and list games successfully');
})

// Test 9: View game information
var sGameId = '1';
test('game info test', function(sGameId){
	sAsp = 'games/' + sGameId;
	sQuery = '';
	equals(loadXMLDoc('1', 'GET', sAsp, sQuery).gameId, sGameId, 'Get game info successfully');
});

// Test 10: View player profile 
test('view profile test', function(){
	sAsp = 'players/sPlayerId';
	sQuery = '';
	equals(loadXMLDoc('1', 'GET', sAsp, sQuery).playerId, sPlayerId, 'View profile successfully');
});

// Test 11: View player history
// It is assumed that the player history will be sent back from the Server. 
test('view history test', function(){
	// An assumed active server page which will return a JSON object with with an array "history[]" for different games played, 
    // and attributes of "wincount", "losecount", "tiecount" in each element.
	sAsp = '/players/player_history.asp';
	sQuery = '?playerId=' + sPlayerId;
	var iWin = loadXMLDoc('1', 'GET', sAsp, sQuery).history[0].wincount;
	var iLose = loadXMLDoc('1', 'GET', sAsp, sQuery).history[0].losecount;
	var iTie = loadXMLDoc('1', 'GET', sAsp, sQuery).history[0].tiecount;
	ok(iWin + iLose + iTie !== 0, 'View history successfully');
});

// Test 12: Edit profile information correctly
var sNewValue = 'NewNickName';
test('edit profile test', function(){
	sAsp = 'players/' + sPlayerId;
	sQuery = '?accessSignature=' + sAccessSignature + 'nickName=' + sNewValue;
	equals(loadXMLDoc('1', 'PUT', sAsp, sQuery).success, 'UPDATED_PLAYER', 'Edit profile successfully');
});

// Test 13: Edit profile with wrong accessSignature
var sNewValue = 'NewNickName';
var sWrongAccessSignature;
test('edit profile test', function(){
	sAsp = 'players/' + sPlayerId;
	sQuery = '?accessSignature=' + sWrongAccessSignature + 'nickName=' + sNewValue;
	equals(loadXMLDoc('1', 'PUT', sAsp, sQuery).error, 'WRONG_ACCESS_SIGNATURE', 'Wrong access signature');
});

// Test 14: Edit profile with wrong playerId
test('edit profile test', function(){
	sAsp = 'players/' + sWrongPlayerId;
	sQuery = '?accessSignature=' + sAccessSignature + 'nickName=' + sNewValue;
	equals(loadXMLDoc('1', 'PUT', sAsp, sQuery).error, 'WRONG_PLAYER_ID', 'Wrong playerId');
});


// Test 15: Delete player profile
test('delete player profile test', function(){
	sAsp = 'players/' + sPlayerId;
	sQuery = '?accessSignature=' + sAccessSignature;
	equals(loadXMLDoc('1', 'DELETE', sAsp, sQuery).success, 'DELETED_PLAYER', 'Delete profile successfully');
});



/* Tests for Server Version 2 */
module('Tests for Server Version 2');

// Test 1: List games with rate > 4
test('list most popular games test', function(){
	sAsp = 'list_game.asp';
	sQuery = '?category=most_popular';
	var oGames = loadXMLDoc('2', 'GET', sAsp, sQuery);
	var iCount = loadXMLDoc('2', 'GET', sAsp, sQuery).count;
    ok(oGames.games[0].rate > 4, 'list most popular games successfully');
    ok(oGames.games[1].rate > 4, 'list most popular games successfully');  
    ok(oGames.games[iCount-1].rate > 4, 'list most popular games successfully');      
});

// Test 2: Login with facebook
var sFacebookEmail = 'FaceBook@email.com';
var sFacebookPwd = 'NewPlayerPwd';
test('login with facebook test', function(sFacebookEmail, sFacebookPwd){
	sAsp = 'players';
	sQuery = '?email=' + sFacebookEmail + '&password=' + sFacebookPwd;
	ok(loadXMLDoc('2', 'GET', sAsp, sQuery).accessSignature,'Log in via Facebook successfully');
});

// Test 3: Get friend list of FaceBook
test('list Facebook friend test', function(){
	// An assumed active server page which will return a JSON object with attributes of "count" and array "FBfriends[]"
	sAsp = 'player_friendlist.asp';
	sQuery = '?accessSignature=' + sAccessSignature;
	var sFaceFriend = loadXMLDoc('2', 'GET', sAsp, sQuery);
	var sFaceFriendCount = loadXMLDoc('2', 'GET', sAsp, sQuery).count;
    ok(sFaceFriendCount > 0, 'List facebook friends successfully');      
});

// Test 4: View leaderboard
test('view leaderboard test', function(){
	// An assumed active server page which will return a JSON object with attributes of "count" and array "players[]"
    sAsp = 'leaderboard.asp';
    sQuery = '';
    var oLeaderPlayers = loadXMLDoc('2', 'GET', sAsp, sQuery).players;
    var iCount = loadXMLDoc('2', 'GET', sAsp, sQuery).count;
    equals(iCount, 10, 'View 10 players on leaderboard successfully');
    ok(oLeaderPlayers[0].token > oLeaderPlayers[1].token, 'List 0 before 1 on leaderboard successfully');
});

//Test 5: Update players' token amount
// It assumes the token change is requested by Player Pages, instead of the Container
iNewToken = 100;
test('update token test', function(sNewToken){
	sAsp = 'players/' + sPlayerId;
	sQuery = '?accessSignature=' + sAccessSignature + 'tokens=' + iNewToken;
	equals(loadXMLDoc('2', 'PUT', sAsp, sQuery).success, 'UPDATED_PLAYER', 'Update tokens successfully');
});

//Test 6: Update players' reward
// It assumes the reward change is requested by Player Pages, instead of the Container
sNewReward = "X";
test('update players reward test', function(sNewReward){
	sAsp = 'players/' + sPlayerId;
	sQuery = '?accessSignature=' + sAccessSignature + 'reward=' + sNewReward;
	equals(loadXMLDoc('2', 'PUT', sAsp, sQuery).success, 'UPDATED_PLAYER', 'Update rewards successfully');
});

// Test 7: View player reward 
test('view player reward test', function(sPlayerId){	
	sAsp = 'players/' + sPlayerId;
	sQuery = '?accessSignature=' + sAccessSignature;
	ok(loadXMLDoc('2', 'GET', sAsp, sQuery).success, 'View player reward successfully');
});

// Test 8: View reward rules
var sRewardId = '1';
test('view reward rules test', function(sRewardId){
	// An assumed page which will return the reward rule
	sAsp = 'rewards';
	sQuery = '?rewardId=' + sRewardId;
	ok(loadXMLDoc('2', 'GET', sAsp, sQuery).success, 'View reward rules successfully');
});

// Test 9: Player rate the game
iRate = 5;
test('player rate the game test', function(sGameID, iRate){
	// An assumed page which will return a JSON object with attributes of "playerId", "gameId" and "rate"
	sAsp = 'rate_game.asp';
	sQuery = '?accessSignature' +sAccessSignature + '?gameId=' + sGameId + '?rate' + iRate;
	equals(loadXMLDoc('2', 'POST', sAsp, sQuery).rate, iRate, 'Player rate the game successfully');
})

//Test 10: Update players' achievement
// It assumes the achievement change is requested by Player Pages, instead of the Container
sNewAchievement = "Y";
test('update players achievement test', function(sNewAchievement){
	sAsp = 'players/' + sPlayerId;
	sQuery = '?accessSignature=' + sAccessSignature + 'achievement=' + sNewAchievement;
	equals(loadXMLDoc('2', 'PUT', sAsp, sQuery).success, 'UPDATED_PLAYER', 'Update rewards successfully');
});

//Test 11: Update players' token rank
// It assumes the token rank change is requested by Player Pages, instead of the Container
iNewTokenRank = 1;
test('update players token rank test', function(iNewTokenRank){
	sAsp = 'players/' + sPlayerId;
	sQuery = '?accessSignature=' + sAccessSignature + 'tokenRank=' + iNewTokenRank;
	equals(loadXMLDoc('2', 'PUT', sAsp, sQuery).success, 'UPDATED_PLAYER', 'Update token rank successfully');
});

//Test 12: Update players' reward rank
// It assumes the reward rank change is requested by Player Pages, instead of the Container
iNewRewardRank = 2;
test('update player reward rank test', function(iNewRewardRank){
	sAsp = 'players/' + sPlayerId;
	sQuery = '?accessSignature=' + sAccessSignature + 'rewardRank=' + iNewRewardRank;
	equals(loadXMLDoc('2', 'PUT', sAsp, sQuery).success, 'UPDATED_PLAYER', 'Update reward rank successfully');
});



/* Tests for Server Version 3 */
module('Tests for Server Version 3');

// Test 1: Choose to be auto matched
// It is assumed that the player auto_match status on/off will be transferred from/to the Server, instead of from/to the Container directly
test('auto match test', function(){
	// An assumed active server page which will return a JSON object with attribute "auto_match" to be on/off
	sAsp = 'auto_match.asp';
	sQuery = '?accessSignature=' + sAccessSignature;
	ok(loadXMLDoc('3', 'GET', sAsp, sQuery).auto_match, 'Turn on auto_match successfully');
});

// Test 2: Choose to cancel auto matched
test('cancel auto match test', function(){
	sAsp = 'auto_match.asp';
	sQuery = '?accessSignature=' + sAccessSignature;
	ok(!loadXMLDoc('3', 'GET', sAsp, sQuery).auto_match, 'Turn off auto_match successfully');	
});

// Test 3: Invite friend by email
var sFdEmail = 'friend@email.com';
test('invite friend email test', function(sFdEmail){
	// An assumed active server page which will return a JSON object with attributes of "count" and array of invited friends' emails "friends[]"
	sAsp = 'invite_friends_email.asp';
	sQuery = '?fdemail=' + sFdEmail + '&accessSignature=' + sAccessSignature; 
	var iFdCount = loadXMLDoc('3', 'POST', sAsp, sQuery).count;
	equal(loadXMLDoc('3', 'POST', sAsp, sQuery).friends[iFdCount-1], sFdEmail, 'Invite friend via email successfully');	
});

// Test 4: Invite friend publicly by link copy
var sGameURL = 'xxx.appspot.com'; //put the game URL here
test('invite friend public test', function(sGameURL){
	// An assumed active server page which will return a JSON object with attribute "gameURL"
	sAsp = 'invite_friends_public.asp';
	sQuery = '?gameId=' + sGameId + '&accessSignature=' + sAccessSignature;
	equal(loadXMLDoc('3', 'POST', sAsp, sQuery).gameURL, sGameURL, 'Invite friend publicly successfully');	
});

// Test 5: Invite player to a game
// It is assumed that the player invitation will be transferred to the Server, instead of to the Container directly
var sGameId = '1';
var sFriendId = '1';
test('player invite friend to a game test', function(sGameId, sFriendId){
	// An assumed active server page which will return a JSON object with attributes of "gameId", "friendId" and "invite_friend" to be true/false
	sAsp = 'invite_friend_to_play.asp';
	sQuery = '?accessSignature=' + sAccessSignature + '&gameId=' + sGameId + '?friendId=' + sFriendId;
	equals(loadXMLDoc('3', 'GET', sAsp, sQuery).gameId, sGameId, 'Choose game successfully');
	equals(loadXMLDoc('3', 'GET', sAsp, sQuery).friendId, sFriendId, 'Choose friend successfully');
	ok(loadXMLDoc('3', 'GET', sAsp, sQuery).invite_friend, 'Invite friend successfully');
});

// Test 6: Cancel invite player to a game
test('player cancel invite friend to a game test', function(sGameId, sFriendId){
	sAsp = 'invite_friend_to_play.asp';
	sQuery = '?accessSignature=' + sAccessSignature + '&gameId=' + sGameId + '?friendId=' + sFriendId;
	equals(loadXMLDoc('3', 'GET', sAsp, sQuery).gameId, sGameId, 'Choose game successfully');
	equals(loadXMLDoc('3', 'GET', sAsp, sQuery).friendId, sFriendId, 'Choose friend successfully');
	ok(!loadXMLDoc('3', 'GET', sAsp, sQuery).invite_friend, 'Undo invite friend successfully');
});

// Test 7: Accept invitation
// It is assumed that the player accept/decline invitation information will be transferred to the Server, instead of to the Container directly
test('accept invitation test', function(){
	// An assumed active server page which will return a JSON object with attributes of "invitationId", "gameId", "friendId" 
	// and "accept_invitation" to be true/false
	sAsp = 'accept_invitation.asp';
	sQuery = '?accessSignature=' + sAccessSignature;
	ok(loadXMLDoc('3', 'GET', sAsp, sQuery).accept_invitation, 'Accept invitation successfully');
});

// Test 8: Decline invitation
test('decline invitation test', function(){
	// An assumed active server page which will return a JSON object with attributes of "invitationId", "gameId", "friendId" 
	// and "accept_invitation" to be true/false	
	sAsp = 'decline_invitation.asp';
	sQuery = '?accessSignature=' + sAccessSignature;
	ok(!loadXMLDoc('3', 'GET', sAsp, sQuery).accept_invitation, 'Decline invitation successfully');
});

// Test 9: Set amount of tokens to bet
// It is assumed that the bet information will be transferred to the Server, instead of to the Container directly
var iTokenBet = 10;
test('player set amount of token to bet test', function(sGameId, iTokenBet){
	// An assumed active server page which will return a JSON object with attributes of "gameId", "tokenBet", etc.
	sAsp = 'set_tokens_bet.asp';
	sQuery = '?accessSignature=' + sAccessSignature + '&gameId=' + sGameId + '&tokenBet=' + iTokenBet;
	equals(loadXMLDoc('3', 'GET', sAsp, sQuery).tokenBet, iTokenBet, 'Choose token amount successfully');
});

// Test 10: Bet tokens
test('player bet token test', function(){
	// An assumed active server page which confirm the bet and will return a JSON object with attributes of "gameId", "tokenBet" 
	// and "bet_tokens" to be true/false.
	sAsp = 'bet_tokens.asp';
	sQuery = '?accessSignature=' + sAccessSignature;
	ok(loadXMLDoc('3', 'GET', sAsp, sQuery).bet_tokens, 'Bet tokens successfully');
});

// Test 11: Send message to a friend
var sMessage = 'Hello World!';
test('player send message to a friend test', function(sFriendId, sMessage){
	// An assumed active server page which will return a JSON object with attributes of "friendId" and "message"
	sAsp = 'send_message_private.asp';
	sQuery = '?accessSignature=' + sAccessSignature + '&friendId=' + sFriendId + '&message=' + sMessage;
	equals(loadXMLDoc('3', 'POST', sAsp, sQuery).friendId, sFriendId, 'Choose friend successfully');
	equals(loadXMLDoc('3', 'POST', sAsp, sQuery).message, sMessage, 'Send private message successfully');
});

// Test 12: Send message to public
var sMessage = 'Hello World!';
test('player send message to public test', function(sMessage){
	sAsp = 'send_message_public.asp';
	sQuery = '?accessSignature=' + sAccessSignature + '&message=' + sMessage;
	equals(loadXMLDoc('3', 'POST', sAsp, sQuery).message, sMessage, 'Send public message successfully');
});

// Test 13: Block message from a player
var sBlockPlayerId = '2';
test('block message test', function(sBlockPlayerId){
	// An assumed active server page which will return a JSON object with attributes of "count" and array of block playerIds "black_list[]"
	sAsp = 'block_message.asp';
	sQuery = '?accessSignature' + sAccessSignature + '&blockPlayerId=' + sBlockPlayerId;
    var iCount = loadXMLDoc('3', 'POST', sAsp, sQuery).count;
	equals(loadXMLDoc('3', 'POST', sAsp, sQuery).black_list[iCount-1], sBlockPlayerId, 'Block message successfully');
});

// Test 14: Unblock message from a player
var sBlockPlayerId = '3';
test('unblock message test', function(sUnblockPlayerId){
	sAsp = 'block_message.asp';
	sQuery = '?accessSignature' + sAccessSignature + '&blockPlayerId=' + sUnblockPlayerId;
    var iCount = loadXMLDoc('3', 'POST', sAsp, sQuery).count;
	ok(!loadXMLDoc('3', 'POST', sAsp, sQuery).black_list[iCount-1] !== sUnblockPlayerId, 'Unblock message successfully');
});