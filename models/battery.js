// Variables
// ########################################
var Pan18650 = BuildProtoCell("Panasonic 18650", "Li-ion", 3.7, 3400, 0, 7.50, true);
var Gen18650 = BuildProtoCell("Generic 18650", "Li-ion", 4.0, 2000, 0, 2.00, true);
var TgyD = BuildProtoCell('Tenergy "D" cell', "NiMH", 1.2, 10000, 0, 7.36, true);
var DclD = BuildProtoCell('Duracell "D" cell', "Alkaline", 1.5, 14000, 14000, 2.52, false);
var DclC = BuildProtoCell('Duracell "C" cell', "Alkaline", 1.5, 7000, 7000, 1.42, false);
var DclAA = BuildProtoCell('Duracell "AA" cell', "Alkaline", 1.5, 2100, 2100, 0.50, false);
var DclAAA = BuildProtoCell('Duracell "AAA" cell', "Alkaline", 1.5, 1000, 1000, 0.52, false);
var ElpAA = BuildProtoCell('Eneloop "AA" cell', "NiMH", 1.2, 2000, 2000, 3.09, true);
var ElpAAA = BuildProtoCell('Eneloop "AAA" cell', "NiMH", 1.2, 750, 750, 2.25, true);

var tempSerMatch = 0;
var tempParMatch = 0;

var ninetyPerIncl = 0.89;
var oneTenPerIncl = 1.112;
var oneTwentyPerIncl = 1.21;
var BatLossMultipler = 1.42857;

var c = buildBattery(Pan18650, 3, 4);
var d = buildBattery(Pan18650, 1, 1);

// Logic
// ########################################






// Functions 
// ########################################

function BuildProtoCell(name, type, volts, mAhRating, mAhLeft, priceEach, rechar){
  function cell() {
    this.name = function() {return name;};
    this.type = function() {return type;};
    this.volts = volts;
    this.mAhRating = function() {return mAhRating;};
    this.mAhLeft = mAhLeft;
    this.priceEach = function() {return priceEach;};
    this.rechar = function() {return rechar;};
  }
  return cell;
}

function buildBattery(batCell, userInputSeries, userInputParallel){
  var battery = [];  
  for ( var x = 0; x < userInputParallel; x++){
    battery.push([]);    
    for ( var y = 0; y < userInputSeries; y++){
      battery[x].push(new batCell());
    }    
  }
  return battery;
}

function charge(deadBat, chargeHours, chargeRate){
  var totalCellCount = deadBat.length * deadBat[0].length;
  var mAhUsedPerCell = deadBat[0][0].mAhRating() - deadBat[0][0].mAhLeft;
  var chargemAhPerCell = chargeHours * chargeRate / totalCellCount;

  if (!deadBat[0][0].rechar()){
    return "That battery is not rechargeable!";

  } else if(mAhUsedPerCell < chargemAhPerCell){
    return "That would overcharge the battery. The battery only needs " + 
           (mAhUsedPerCell * totalCellCount) + "mAh more.";    

  } else {
    for(var i = 0; i < deadBat.length; i++){
      for(var j = 0; j < deadBat[i].length; j++){            
        deadBat[i][j].mAhLeft += chargemAhPerCell;
      }      
    }      
    return "The battery is charged to " + (deadBat[0][0].mAhLeft * deadBat.length).toFixed(0) + "mAh.";
  }    
}

function use(freshBat, hoursUsed, currentDraw){
  var totalCellCount = freshBat.length * freshBat[0].length;
  var batCap = freshBat[0][0].mAhLeft * freshBat.length;
  var batWork = hoursUsed * currentDraw * BatLossMultipler;
  var mAhUsedPerCell = batWork / totalCellCount;
  var amountRemaining = (freshBat[0][0].mAhLeft * freshBat.length).toFixed(0);

  if (batCap < batWork){
    return "Not enough capacity for that! The remaining capacity is " +
           amountRemaining + "mAh.";

  } else {
    for(var i = 0; i < freshBat.length; i++){
      for(var j = 0; j < freshBat[i].length; j++){ 
        freshBat[i][j].mAhLeft -= mAhUsedPerCell;
      }
    }
  }
    return amountRemaining + "mAh remaining.";     
}

function checkVolts(vo){
  return (vo[0].length * vo[0][0].volts).toFixed(1) + " volts";
}

function checkAmps(am){
  return (am.length * am[0][0].mAhRating()) + "mAh";
}

function numCells(nc){
  return (nc.length * nc[0].length) + " cells in this battery."; 
}

function totalPrice(pr){
  return "$" + (pr.length * pr[0].length * pr[0][0].priceEach()).toFixed(2); 
}

function getCellSpecs(batCell){
  return "Name: " + batCell.name() + ", type: " + batCell.type() + ", voltage: " + batCell.volts +
   " volts, capacity: " + batCell.mAhRating() + "mAh, current charge: " + batCell.mAhLeft +
   "mAh, price: $" + batCell.priceEach() + ", rechargeable: " + batCell.rechar();
}

function matchUserVolts(batCell, userVolts){  
  var tempVolts = batCell[0][0].volts;
  var numCells  = userVolts / tempVolts;
  var closestSerMatch = numCells.toFixed(0);  
  var actualVolts = closestSerMatch * tempVolts;
  batCell = new batCell(batCell, 1, 1);
  if ((actualVolts < (ninetyPerIncl * userVolts)) || (actualVolts > (oneTenPerIncl * userVolts))){
    return "Perhaps a different cell would be a better match for that voltage.";
  } else {
    tempSerMatch = closestSerMatch;
    return closestSerMatch;
  }  
}

function matchUserAmps(batCell, userAmps){
  var tempAmps = batCell[0][0].mAhRating();
  var numCells  = userAmps / tempAmps;
  var closestParMatch = numCells.toFixed(0);  
  var actualAmps = closestParMatch * tempAmps;  
  if ((actualAmps < (ninetyPerIncl * userAmps)) || (actualAmps > (oneTwentyPerIncl * userAmps))){
    return "Perhaps a different cell would be a better match for that mAh rating.";
  } else { 
    tempParMatch = closestParMatch;
    return closestParMatch;
  }  
}

function matchUserPrice(batCell, userPrice){
  var priceEach = batCell[0][0].priceEach();
  var numCells  = tempSerMatch * tempParMatch;   
  var totalPrice = numCells * priceEach;  
  if (totalPrice > (oneTwentyPerIncl * userPrice)){
    return "Perhaps a different cell would be a better match for that price range.";
  } else { 

    return numCells + " of those will cost $" + totalPrice + ".";
  }  
}