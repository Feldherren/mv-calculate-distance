/*:
 * @plugindesc Calculates the distance between specified 
 * coordinates, events or the player.
 * @author Feldherren
 *
 * @param Item Value Variable
 * @desc ID of variable in which distance calculated by plugin command will be stored.
 * @default 1
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
		// playerX = $gamePlayer.x
		// playerY = $gamePlayer.y
		
		return [$gamePlayer.x, $gamePlayer.y];
	}
	
	function getEventCoords(eventID)
	{
		// eventX = $gameMap.event(eventID).x
		// eventY = $gameMap.event(eventID).y
		
		return [$gameMap.event(eventID).x, $gameMap.event(eventID).y];
	}
	
	function getEventID(eventName)
	{
		eventID = -1
		
		var events = $gameMap.events()
		for (var i = 0; i < noEvents; i++) 
		{
			if (events[i].name == eventName)
			{
				eventID = events[i].eventId();
			}
		}
		
		return eventID
	}

	var FELD_DistCalc_aliasPluginCommand = Game_Interpreter.prototype.pluginCommand;

	Game_Interpreter.prototype.pluginCommand = function(command, args)
	{

		FELD_DistCalc_aliasPluginCommand.call(this,command,args);
		// if(command == "INVENTORYVALUE" && args[0] != null)
		// {
			// calculateInventoryValue($gameParty.getInventory(args[0]));
		// }
		// else if(command == "INVENTORYVALUE")
		// {
			// calculateInventoryValue($gameParty.inventory());
		// }
		if (command == "CALCULATEDISTANCE" && args[0] != null && args[1] != null && args[2] != null)
		{
			// arg 0: variable id to drop result into
			// arg 1: player/coords/event [id/name] A
			// player
			// coord:x,y
			// eventid:i
			// eventname:n
			// arg 2: player/coords/event [id/name] B
			// player
			// coord:x,y
			// eventid:i
			// eventname:n
			// optional, assume target is player if not supplied?

			var variable = args[0];
			
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
				if (targetA == "coord")
				{
					var coords = valueA.split(",");
					aX = coords[0];
					aY = coords[1];
				}
				else if (targetA == "eventid")
				{
					var coords = getEventCoords(valueA);
					aX = coords[0];
					aY = coords[1];
				}
				else if (targetA == "eventname")
				{
					var coords = getEventCoords(getEventID(valueA));
					aX = coords[0];
					aY = coords[1];
				}
			}
			
			if (args[2] != null)
			{
				var targetB = args[1];
			
				if (targetB == "player")
				{
					var playerCoords = getPlayerCoords();
					bX = playerCoords[0];
					bY = playerCoords[1];
				}
				else
				{
					targetB = args[1].split(":")[0];
					valueB = args[1].split(":")[1];
					if (targetB == "coord")
					{
						var coords = valueB.split(",");
						aX = coords[0];
						aY = coords[1];
					}
					else if (targetB == "eventid")
					{
						var coords = getEventCoords(valueB);
						aX = coords[0];
						aY = coords[1];
					}
					else if (targetB == "eventname")
					{
						var coords = getEventCoords(getEventID(valueB));
						aX = coords[0];
						aY = coords[1];
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
			
			$gameVariables.setVariable(variable, calculateDistance(aX, aY, bX, bY));
		}
	}
})();