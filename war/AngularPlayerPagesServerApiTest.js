
var sServer = 'http://smg-server.appspot.com';

var goodPlayer = {
		"email": "player_test@nyu.edu",
		"password": "password"
};
var shortPwdPlayer = {
		"email": "player_test@nyu.edu",
		"password": "pwd"		
};


QUnit.config.reorder = false;

function ajaxInsertNewPlayer(expected)
{
  var jsonObj = newPlayer;

  $.ajax({
    url: sServer + "/players", 
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(jsonObj),
    success: function(data, textStatus, jqXHR) {     
      console.log(data);
      if(data["error"] != "EMAIL_EXISTS" && data["error"] != "PASSWORD_TOO_SHORT" &&
         expected == ""
         ) {
        accessSignature = data.accessSignature;
        playerId = data.playerId
        ok(true);
      }
      else if(data["error"] == "EMAIL_EXISTS" && expected == "EMAIL_EXISTS")
      {
        ok(true);
      }
      else if (data["error"] == "PASSWORD_TOO_SHORT" && expected == "PASSWORD_TOO_SHORT")
      {
        ok(true);
      }
      else 
      {
    	ok(false);
      }

      start();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error("ERROR: " + textStatus + " " + errorThrown);
    }
    });
};

asyncTest("Insert New User Success", function() {
	var index = Math.floor(1000 * Math.random());
	newPlayer = goodPlayer;
	newPlayer.email = newPlayer.email + index;
    ajaxInsertNewPlayer("");
});

asyncTest("Insert New User With Existed Email", function() {
	newPlayer = goodPlayer;
    ajaxInsertNewPlayer("EMAIL_EXISTS");
});

asyncTest("Insert New User With Short Password", function() {
	newPlayer = shortPwdPlayer;
    ajaxInsertNewPlayer("PASSWORD_TOO_SHORT");
});
