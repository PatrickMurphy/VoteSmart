// Broadcaster
var equals = require('deep-equal');

var pulpit = {
	lastBroadcast: undefined,
	currentConnections: 0,
	isBroadcasting: false,
	foxtraxReader_inst: undefined,
	appIO_inst: undefined,

	setup: function(appIO, foxtrax){
		pulpit.appIO_inst = appIO;
		pulpit.foxtraxReader_inst = foxtrax;
        // load module and save as sub module
		pulpit.statistics_inst = statistics;
	},

	sendBroadcast: function sendBroadcast(buses){
		pulpit.lastBroadcast = buses;
		pulpit.appIO_inst.broadcast('buses-location', buses);
	},

	addConnection: function (socket) {
			pulpit.currentConnections++;

			// add the on disconnect handler
			socket.on('disconnect', function(){
					pulpit.removeConnection(socket);
			});

			if(pulpit.currentConnections > 0 && pulpit.isBroadcasting === false){
					pulpit.statistics_inst.resetTimes();
					pulpit.broadcastCoords();
			}
			console.log('New connection: ' + socket.id);
			console.log('Current Connections: ' + pulpit.currentConnections);
	},

	removeConnection: function(socket) {
			console.log('Disconnect: ' + socket.id); // todo: assign human recognizable names for logging like names of fruit or just random names
			pulpit.currentConnections--;
	},

	ifClientsAreConnected: function ifClientsAreConnected(callback){
		if(pulpit.currentConnections > 0) {
			pulpit.isBroadcasting = true;
			callback();
		}else{
			pulpit.isBroadcasting = false;
		}
	},

	didBusesMove: function didBusesMove(busStats){
		var busesMoved = false, // assume false until proven otherwise
            busID;
        for(busID in busStats){
            if(!equals(busStats[busID].lastCoords, busStats[busID].newCoords)){
                // bus moved change flag
                busesMoved = true;
                pulpit.statistics_inst.runningAverage(pulpit.statistics_inst.getBusStat(busID));
            }else if(busStats[busID].stopped){
                pulpit.statistics_inst.getBusStat(busID).lastEventSent = new Date();
            }
        }

        return busesMoved;
	},

	broadcastCoords: function broadcastCoords(){
		pulpit.ifClientsAreConnected(function(){
			setTimeout(pulpit.getBusCoords, 6000 );
		});
	},

	getBusCoords: function getBusCoords(){
			var callback = function (points){
				var buses = pulpit.foxtraxReader_inst.pointsToBuses(points),
						strippedBusses = pulpit.foxtraxReader_inst.functioning_buses(buses);
				if(pulpit.lastBroadcast === undefined) {
					console.log('initial broadcast');
					pulpit.statistics_inst.resetTimes();
					pulpit.sendBroadcast(strippedBusses);
				}else{ // already broadcasted initial
					pulpit.statistics_inst.getBusStats(strippedBusses, pulpit.lastBroadcast, function(busStats){
						if(pulpit.didBusesMove(busStats)){
							// new coords
							pulpit.sendBroadcast(strippedBusses);
							pulpit.statistics_inst.runningAverage(pulpit.statistics_inst.stats.total); // total
						}else{
                            var allBusesStopped = true,
                                busID;
                            for(busID in busStats){
                                if(allBusesStopped === false){
                                    break;
                                }else{
                                    allBusesStopped = busStats[busID].stopped;
                                }
                            }
							// no change in coords
							if(allBusesStopped){ // reset last update time if both buses stopped
								pulpit.statistics_inst.resetTimes();
                            }
								process.stdout.write('.');
						}
					});
				}
				// create callback loop
				pulpit.broadcastCoords();
			};
			pulpit.foxtraxReader_inst.getCoords(callback);
	},

	get: function get(key){
		if(pulpit.hasOwnProperty(key)){
			return pulpit[key];
		}
	},
	set: function set(key, value){
		if(pulpit.hasOwnProperty(key)){
			pulpit[key] = value;
		}
	}
}

module.exports = pulpit;
