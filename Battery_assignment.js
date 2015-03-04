function buildCell(type, volts, maxmAh, mAhleft, priceEach, rechar){
  function cell (type, volts, maxmAh, mAhleft, priceEach, rechar){    
    type: function() {return type;},
    volts: volts,
    maxmAh: function() {return maxmAh;},
    mAhleft: mAhleft,
    priceEach: function() {return priceEach;},
    rechar: function() {return rechar;},
  }
  return ;
}
var Panasonic18650 = buildCell("Li-ion", 3.7, 3400, 0, 7.50, true);
var China18650 = buildCell("Li-ion", 4.0, 2000, 0, 2.00, true);
var TenergyD = buildCell("NiMH", 1.2, 10000, 0, 7.36, true);
var DuracellD = buildCell("Alkaline", 1.5, 14000, 14000, 2.52, false);
var DuracellC = buildCell("Alkaline", 1.5, 7000, 7000, 1.42, false);
var DuracellAA = buildCell("Alkaline", 1.5, 2100, 2100, 0.50, false);
var DuracellAAA = buildCell("Alkaline", 1.5, 1000, 1000, 0.52, false);
var EneloopAA = buildCell("NiMH", 1.2, 2000, 2000, 3.09, true);
var EneloopAAA = buildCell("NiMH", 1.2, 750, 750, 2.25, true);

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
      return "Not enough capacity for that!";
    } else {
      this.mAhleft -= hoursUsed * currentDraw * 1.43;
      return this.mAhleft;    
      }
  }
};

var userSeriesInput = prompt();

var seriesVolts = this.volts * userSeriesInput;

var seriesAmps = this.maxmAh;

var seriesPrice = this.priceEach * userSeriesInput;


var userParallelInput = prompt();

var parallelVolts = this.volts; 

var parallelAmps = this.maxmAh * userParallelInput;

var parallelPrice = this.priceEach * userParallelInput;

