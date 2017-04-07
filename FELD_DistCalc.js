/*:
 * @plugindesc Calculates the distance between specified 
 * coordinates, events or the player.
 * @author Feldherren
 
Calculates the distance between the player, coordinates or events. Whilst this can be
done by event commands, it's a lot nicer to have a single plugin command do it for me
than ten to twenty event commands.

Plugin commands:
CALCULATEDISTANCE variableID coords:x,y|eventid:x|player [coords:x,y|eventid:x|player]
Calculates the distance between the provided two things or locations, and stores it in 
the specified variable. If the third argument is not provided, assumes you want to compare 
the second argument with the player's location.
Takes a variable ID number for the first argument.
Takes either 'coords:x,y', 'eventid:x' or 'player' for the second argument. This is the first
location or thing it will compare.
Takes either 'coords:x,y', 'eventid:x', 'player' or nothing for the third argument; if nothing
is supplied, will assume you want to compare the second argument to the player's current 
location.
 */ 
(function(){
	function calculateDistance(aX, aY, bX, bY) 
	{
		var distanceX = aX - bX;
		var distanceY = aY - bY;
		if (distanceX < 0)
		{
			distanceX = distanceX*-1;
		}
		if (distanceY < 0)
		{
			distanceY = distanceY*-1;
		}
		
		return distanceX + distanceY;
	}
	
	function getPlayerCoords()
	{
		return [$gamePlayer.x, $gamePlayer.y];
	}
	
	function getEventCoords(eventID)
	{
		return [$gameMap.event(eventID).x, $gameMap.event(eventID).y];
	}
	
	function getEventID(eventName)
	{
		var events = $gameMap.events()
		for (var i = 0; i < events.length; i++) 
		{
			if (events[i].name == eventName)
			{
				return events[i].eventId();
			}
		}
	}
	
	console.log("Test")

	var FELD_DistCalc_aliasPluginCommand = Game_Interpreter.prototype.pluginCommand;

	Game_Interpreter.prototype.pluginCommand = function(command, args)
	{

		FELD_DistCalc_aliasPluginCommand.call(this,command,args);
		
		if (command == "CALCULATEDISTANCE" && args[0] != null && args[1] != null)
		{
			var variable = parseInt(args[0]);
			
			// Setting default values
			var aX = 0;
			var aY = 0;
			var bX = 0;
			var bY = 0;
			
			var targetA = args[1];
			
			if (targetA == "player")
			{
				var playerCoords = getPlayerCoords();
				aX = playerCoords[0];
				aY = playerCoords[1];
			}
			else
			{
				targetA = args[1].split(":")[0];
				valueA = args[1].split(":")[1];
				if (targetA == "coords")
				{
					var coords = valueA.split(",");
					aX = parseInt(coords[0]);
					aY = parseInt(coords[1]);
				}
				else if (targetA == "eventid")
				{
					var coords = getEventCoords(valueA);
					aX = coords[0];
					aY = coords[1];
				}
			}
			
			if (args[2] != null)
			{
				var targetB = args[2];
			
				if (targetB == "player")
				{
					var playerCoords = getPlayerCoords();
					bX = playerCoords[0];
					bY = playerCoords[1];
				}
				else
				{
					targetB = args[2].split(":")[0];
					valueB = args[2].split(":")[1];
					if (targetB == "coords")
					{
						var coords = valueB.split(",");
						bX = parseInt(coords[0]);
						bY = parseInt(coords[1]);
					}
					else if (targetB == "eventid")
					{
						var coords = getEventCoords(valueB);
						bX = coords[0];
						bY = coords[1];
					}
				}
			}
			else
			{
				// nothing was supplied, so assume they want to check distance to the player
				var playerCoords = getPlayerCoords();
				bX = playerCoords[0];
				bY = playerCoords[1];
			}
			$gameVariables.setValue(variable, calculateDistance(aX, aY, bX, bY));
		}
	}
})();