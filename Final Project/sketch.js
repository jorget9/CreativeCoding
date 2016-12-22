var request = require('request');
var dl = require('datalib');
var d3 = require('d3');

var shot_chart_url = 'http://stats.nba.com/stats/shotchartdetail?CFID=33&CFPAR'+
'AMS=2014-15&ContextFilter=&ContextMeasure=FGA&DateFrom=&D'+
'ateTo=&GameID=&GameSegment=&LastNGames=0&LeagueID=00&Loca'+
'tion=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&'+
'PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID=203506&Plu'+
'sMinus=N&Position=&Rank=N&RookieYear=&Season=2014-15&Seas'+
'onSegment=&SeasonType=Regular+Season&TeamID=0&VsConferenc'+
'e=&VsDivision=&mode=Advanced&showDetails=0&showShots=1&sh'+
'owZones=0';


request.get(shot_chart_url, function(err, res, body){
    var data = JSON.parse(body);
    var playerArray = data.resultSets[0].rowSet;

    var x = [];
    var y = [];
    var made = [];
    var attempts = [];
    playerArray.forEach(function(a){

       x.push(a[a.length-4]);
        y.push(a[a.length-3]);
        made.push(a[a.length-1]);
        attempts.push(a[a.length-2]);

    })
});  
    var tenderData = [];
    for(var i = 0; i < playerArray.length; i++){
        tenderData.push({"x":Math.ceil((x[i]+243)/10),
            "y": Math.ceil((y[i]+17)/9),
            "made": made[i],
            "attempts": attempts[i]});
    }
        var coll = d3.nest()
        .key(function(d) {return [d.x, d.y]; })
        .rollup(function(v){return{
            made: d3.sum(v, function(d) {return d.made}),
            attempts: d3.sum(v, function(d){return d.attempts}),
            shootingPercentage:  d3.sum(v, function(d) {return d.made})/d3.sum(v, function(d){return d.attempts})
        }})
        .entries(tenderData);
            coll.forEach(function(a){
        a.key = JSON.parse("[" + a.key + "]");
        z.push(a.values.shootingPercentage);
    });

    var meanShot = dl.mean(z);
    var shotSTDV = dl.stdev(z);
        coll.forEach(function(a){
        var k = (a.values.shootingPercentage - meanShot)/shotSTDV;
        finalData.push({"x": a.key[0], "y": a.key[1], "z": k, "made": a.values.made, "attempts": a.values.attempts})
    });
    var heatRange = ['#5458A2', '#6689BB', '#FADC97', '#F08460', '#B02B48'];
d3.select(document.getElementById('chart'))
    .append("svg")
    .chart("BasketballShotChart", {
        width: 600,
        title: 'Victor Oladipo 2014-15',
        // instead of makes/attempts, use z
        hexagonFillValue: function(d) {  return d.z; },
        // switch heat scale domain to [-2.5, 2.5] to reflect range of z values
        heatScale: d3.scale.quantile()
            .domain([-2.5, 2.5])
            .range(heatRange),
        // update our binning algorithm to properly join z values
        // here, we update the z value to be proportional to the events of each point
        hexagonBin: function (point, bin) {
            var currentZ = bin.z || 0;
            var totalAttempts = bin.attempts || 0;
            var totalZ = currentZ * totalAttempts;

            var attempts = point.attempts || 1;
            bin.attempts = totalAttempts + attempts;
            bin.z = (totalZ + (point.z * attempts))/bin.attempts;
        },
    })
    .draw(data);