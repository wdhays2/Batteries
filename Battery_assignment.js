function BuildCell(name, type, volts, maxmAh, mAhleft, priceEach, rechar){  
  function cell() { 
    this.name = function() {return name;};  
    this.type = function() {return type;};
    this.volts = volts;
    this.maxmAh = function() {return maxmAh;}
    this.mAhleft = mAhleft;
    this.priceEach = function() {return priceEach;};
    this.rechar = function() {return rechar;};
  }
  return cell;
}
var Pan18650 = BuildCell("Panasonic 18650", "Li-ion", 3.7, 3400, 0, 7.50, true);
var Gen18650 = BuildCell("Generic 18650", "Li-ion", 4.0, 2000, 0, 2.00, true);
var TgyD = BuildCell("Tenergy \"D\" cell", "NiMH", 1.2, 10000, 0, 7.36, true);
var DclD = BuildCell("Duracell \"D\" cell", "Alkaline", 1.5, 14000, 14000, 2.52, false);
var DclC = BuildCell("Duracell \"C\" cell", "Alkaline", 1.5, 7000, 7000, 1.42, false);
var DclAA = BuildCell("Duracell \"AA\" cell", "Alkaline", 1.5, 2100, 2100, 0.50, false);
var DclAAA = BuildCell("Duracell \"AAA\" cell", "Alkaline", 1.5, 1000, 1000, 0.52, false);
var ElpAA = BuildCell("Eneloop \"AA\" cell", "NiMH", 1.2, 2000, 2000, 3.09, true);
var ElpAAA = BuildCell("Eneloop \"AAA\" cell", "NiMH", 1.2, 750, 750, 2.25, true);

var cell1 = new Pan18650();
var cell2 = new Pan18650();
var cell3 = new TgyD();
var cell4 = new ElpAA();

var currentDraw = 0;
var hoursUsed = 0;

var Battery = [];
var BatBank = [];

function buildSeriesBatt(){
  var numCell = 0;
  numCell++;
  cell+numCell = {name: name, type: type, volts: volts, maxmAh: maxmAh, 
  mAhleft: mAhleft, priceEach: priceEach, rechar: rechar};
  return cell+numCell; 
};

var userSeriesInput = "";
var seriesVolts = this.volts * userSeriesInput;
var seriesAmps = this.maxmAh;
var seriesPrice = this.priceEach * userSeriesInput;

var userParallelInput = "";
var parallelVolts = this.volts; 
var parallelAmps = this.maxmAh * userParallelInput;
var parallelPrice = this.priceEach * userParallelInput;

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



