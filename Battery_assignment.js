function BuildProtoCell(name, type, volts, maxmAh, mAhleft, priceEach, rechar){  
  function protoCell() { 
    this.name = function() {return name;};  
    this.type = function() {return type;};
    this.volts = volts;
    this.maxmAh = function() {return maxmAh;}
    this.mAhleft = mAhleft;
    this.priceEach = function() {return priceEach;};
    this.rechar = function() {return rechar;};
  } 
  return protoCell;
}
var Pan18650 = BuildProtoCell("Panasonic 18650", "Li-ion", 3.7, 3400, 0, 7.50, true);
var Gen18650 = BuildProtoCell("Generic 18650", "Li-ion", 4.0, 2000, 0, 2.00, true);
var TgyD = BuildProtoCell("Tenergy \"D\" cell", "NiMH", 1.2, 10000, 0, 7.36, true);
var DclD = BuildProtoCell("Duracell \"D\" cell", "Alkaline", 1.5, 14000, 14000, 2.52, false);
var DclC = BuildProtoCell("Duracell \"C\" cell", "Alkaline", 1.5, 7000, 7000, 1.42, false);
var DclAA = BuildProtoCell("Duracell \"AA\" cell", "Alkaline", 1.5, 2100, 2100, 0.50, false);
var DclAAA = BuildProtoCell("Duracell \"AAA\" cell", "Alkaline", 1.5, 1000, 1000, 0.52, false);
var ElpAA = BuildProtoCell("Eneloop \"AA\" cell", "NiMH", 1.2, 2000, 2000, 3.09, true);
var ElpAAA = BuildProtoCell("Eneloop \"AAA\" cell", "NiMH", 1.2, 750, 750, 2.25, true);

function userCell(protoCell){
  var numCell = 0;
  var cell = {};
  numCell++;
  "cell" + numCell = new protoCell();
  return cell+numCell;
}

var cell1 = new Pan18650();
var cell2 = new Pan18650();
var cell3 = new TgyD();
var cell4 = new ElpAA();



var userInputSeries = "";

function buildSeriesBatt(userCell, userInputSeries){
  var numBatt = 0;
  numBatt++;  
  var seriesVolts = this.volts * userInputSeries;
  var seriesAmps = this.maxmAh;
  var seriesPrice = this.priceEach * userInputSeries;  
  batt+numBatt = {name: name, type: type, volts: volts, maxmAh: maxmAh, 
  mAhleft: mAhleft, priceEach: priceEach, rechar: rechar};
  return batt+numBatt; 
};

var userInputparallel = "";

function buildParallelBatt(){
  var parallelVolts = this.volts; 
  var parallelAmps = this.maxmAh * userInputparallel;
  var parallelPrice = this.priceEach * userInputparallel;
};

var Battery = [];
var BatBank = [];

var currentDraw = 0;
var hoursUsed = 0;

Battery.prototype = {
  charge: function(){
    if (this.rechar == true){
      this.mAhleft = this.maxmAh;
      return this.mAhleft;
    } else {
      return "This battery is not rechargeable!";
    }
  },
  use: function(){
    if (this.mAhLeft < hoursUsed * currentDraw * 1.43){
      return "Not enough capacity for that! The remaining capacity is " + this.mAhleft + "mAh.";
    } else {
      this.mAhleft -= hoursUsed * currentDraw * 1.43;
      return this.mAhleft;    
      }
  }
};