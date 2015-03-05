function BuildProtoCell(name, type, volts, mAhRating, mAhLeft, priceEach, rechar){  
  function cell() { 
    this.name = function() {return name;};  
    this.type = function() {return type;};
    this.volts = volts;
    this.mAhRating = function() {return mAhRating;}
    this.mAhLeft = mAhLeft;
    this.priceEach = function() {return priceEach;};
    this.rechar = function() {return rechar;};
  } 
  return cell;
}
var Pan18650 = BuildProtoCell("Panasonic 18650", "Li-ion", 3.7, 3400, 0, 7.50, true);
var Gen18650 = BuildProtoCell("Generic 18650", "Li-ion", 4.0, 2000, 0, 2.00, true);
var TgyD = BuildProtoCell('Tenergy "D" cell', "NiMH", 1.2, 10000, 0, 7.36, true);
var DclD = BuildProtoCell('Duracell "D" cell', "Alkaline", 1.5, 14000, 14000, 2.52, false);
var DclC = BuildProtoCell('Duracell "C" cell', "Alkaline", 1.5, 7000, 7000, 1.42, false);
var DclAA = BuildProtoCell('Duracell "AA" cell', "Alkaline", 1.5, 2100, 2100, 0.50, false);
var DclAAA = BuildProtoCell('Duracell "AAA" cell', "Alkaline", 1.5, 1000, 1000, 0.52, false);
var ElpAA = BuildProtoCell('Eneloop "AA" cell', "NiMH", 1.2, 2000, 2000, 3.09, true);
var ElpAAA = BuildProtoCell('Eneloop "AAA" cell', "NiMH", 1.2, 750, 750, 2.25, true);

var userInputSeries = 0;

function buildSBatt(batCell, userInputSeries){ 
  var batS = [];  
    for (var i = 0; i<userInputSeries; i++){
    batS.push(new batCell);
    }
  var seriesVolts = batS[0].volts * userInputSeries;
  var seriesAmps = batS[0].mAhRating();
  var seriesPrice = batS[0].priceEach() * userInputSeries;
  batS.push(seriesVolts);
  batS.push(seriesAmps);
  batS.push(seriesPrice);
  return batS;
}

var userInputParallel = 0;





function buildPBatt(batCell, userInputParallel){
  var batP = [];   
    for (var i = 0; i<userInputParallel; i++){
    batP.push(new batCell);
    }
  var parallelVolts = batP[0].volts; 
  var parallelAmps = batP[0].mAhRating() * userInputParallel;
  var parallelPrice = batP[0].priceEach() * userInputParallel; 
  batP.push(parallelVolts);
  batP.push(parallelAmps);
  batP.push(parallelPrice);   
  return batP;
}


var batBank = [[]];
var Battery = [];
var currentDraw = 0;
var hoursUsed = 0;

Battery.prototype = {
  charge: function(){
    if (this.rechar == true){
      this.mAhLeft = this.mAhRating;
      return this.mAhLeft;
    } else {
      return "This battery is not rechargeable!";
    }
  },
  use: function(){
    if (this.mAhLeft < hoursUsed * currentDraw * 1.43){
      return "Not enough capacity for that! The remaining capacity is " + this.mAhLeft + "mAh.";
    } else {
      this.mAhLeft -= hoursUsed * currentDraw * 1.43;
      return this.mAhLeft;    
      }
  }
}