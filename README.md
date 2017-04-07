# mv-calculate-distance
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