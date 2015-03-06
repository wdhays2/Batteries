function BuildProtoCell(name, type, volts, mAhRating, mAhLeft, priceEach, rechar){  
  function cell() { 
    this.name = function() {return name;};  
    this.type = function() {return type;};
    this.volts = volts;
    this.mAhRating = function() {return mAhRating;};
    this.mAhLeft = mAhLeft;
    this.priceEach = function() {return priceEach.toFixed(2);};
    this.rechar = function() {return rechar;};
  } 
  return cell;
};

var Pan18650 = BuildProtoCell("Panasonic 18650", "Li-ion", 3.7, 3400, 0, 7.50, true);
var Gen18650 = BuildProtoCell("Generic 18650", "Li-ion", 4.0, 2000, 0, 2.00, true);
var TgyD = BuildProtoCell('Tenergy "D" cell', "NiMH", 1.2, 10000, 0, 7.36, true);
var DclD = BuildProtoCell('Duracell "D" cell', "Alkaline", 1.5, 14000, 14000, 2.52, false);
var DclC = BuildProtoCell('Duracell "C" cell', "Alkaline", 1.5, 7000, 7000, 1.42, false);
var DclAA = BuildProtoCell('Duracell "AA" cell', "Alkaline", 1.5, 2100, 2100, 0.50, false);
var DclAAA = BuildProtoCell('Duracell "AAA" cell', "Alkaline", 1.5, 1000, 1000, 0.52, false);
var ElpAA = BuildProtoCell('Eneloop "AA" cell', "NiMH", 1.2, 2000, 2000, 3.09, true);
var ElpAAA = BuildProtoCell('Eneloop "AAA" cell', "NiMH", 1.2, 750, 750, 2.25, true);

function buildSCell(batCell, userInputSeries){ 
  var cellS = [];  
  for (var i = 0; i<userInputSeries; i++){
    cellS.push(new batCell());
  }
  var seriesVolts = cellS[0].volts * userInputSeries;
  var seriesAmps = cellS[0].mAhRating();
  var seriesPrice = cellS[0].priceEach() * userInputSeries;
  cellS.push(seriesVolts.toFixed(1));
  cellS.push(seriesAmps.toFixed(0));
  cellS.push(seriesPrice.toFixed(2));
  return cellS;
};

function buildPCell(batCell, userInputParallel){
  var cellP = [];   
  for (var i = 0; i<userInputParallel; i++){
    cellP.push(new batCell());
  }

  var parallelVolts = cellP[0].volts; 
  var parallelAmps = cellP[0].mAhRating() * userInputParallel;
  var parallelPrice = cellP[0].priceEach() * userInputParallel; 
  cellP.push(parallelVolts.toFixed(1));
  cellP.push(parallelAmps.toFixed(0));
  cellP.push(parallelPrice.toFixed(2));   
  return cellP;
};

function getCellSpecs(batCell){
  return "Name: " + batCell.name() + ", type: " + batCell.type() + ", voltage: " + batCell.volts +
   " volts, capacity: " + batCell.mAhRating() + "mAh, current charge: " + batCell.mAhLeft + 
   "mAh, price: $" + batCell.priceEach() + ", rechargeable: " + batCell.rechar();
};



var batBank = [];
var Battery = [];




function charge(batCell, chargeHours, chargeRate){   
  if (batCell[0].rechar() != true){
    return "This battery is not rechargeable!";
  } 
  else if (
    (batCell[0].mAhRating() - batCell[0].mAhleft) * (batCell.length - 3) < (chargeHours * chargeRate)){
    return "That would overcharge the battery. This battery's maximum capacity is " +
    (batCell[0].mAhRating() * (batCell.length - 3)) + "mAh."; 
  } 
  else { 
    for (var i = 0; i < (batCell.length - 3); i++){
     batCell[i].mAhLeft += (chargeHours * chargeRate / (batCell.length - 3));
    }
  }
  return "The battery is charged to " + (batCell[0].mAhLeft * (batCell.length - 3)) + "mAh.";  
};
  
function use(batCell, hoursUsed, currentDraw){  
  if ((batCell[0].mAhLeft * (batCell.length - 3)) < (hoursUsed * currentDraw * 1.43)){
    return "Not enough capacity for that! The remaining capacity is " + 
    (batCell[0].mAhLeft.toFixed(0) * (batCell.length - 3))  + "mAh.";
  } 
  else {
    for (var i = 0; i < (batCell.length - 3); i++){
     batCell[i].mAhLeft -= (hoursUsed * currentDraw * 1.43 / (batCell.length - 3));
    }
  }   
  return (batCell[0].mAhLeft.toFixed(0) * (batCell.length - 3)) + "mAh remaining.";
};