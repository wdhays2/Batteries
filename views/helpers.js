$( document ).ready(function() {
  $("#cellOptions").change(function() {
    selectCell();
  });
  $("#userInputSer").change(function(){
    selectSer();
  });
  $("#userInputPar").change(function(){
    selectPar();
  });
  $("#userVolts").change(function(){
    calcVolts();
  });
  $("#userAmps").change(function(){
    calcAmps();
  });
  $("#userPrice").change(function(){
    calcPrice();
  });

  $("#buildBattery").click(function() {
    var batCell = stringToCellType( $("#cellOptions").val() );
    var numSeries = parseInt( $("#userInputSer").val() );
    var numParallel = parseInt( $("#userInputPar").val() );
    batteryHolder = buildBatt(batCell, numSeries, numParallel);
    updateBatteryView();
  });
});


// Global Variables
// ---------------------------
var batteryHolder;
// ---------------------------


function selectCell(){
  var batCell = "";
  batCell = $("#cellOptions").val();
  console.log(batCell);
}

function selectSer(){
  var numSeries = 1;
  numSeries = $("#userInputSer").val();
  console.log(numSeries);
}

function selectPar(){
  var numParallel = 1;
  numParallel = $("#userInputPar").val();
  console.log(numParallel);
}

function calcVolts(){
  var wantVolts = 0;
  wantVolts = $("#userVolts").val();
  console.log(wantVolts);
}

function calcAmps(){
  var wantAmps = 0;
  wantAmps = $("#userAmps").val();
  console.log(wantAmps);
}

function calcPrice(){
  var wantPrice = 0;
  wantPrice = $("#userPrice").val();
  console.log(wantPrice);
}

function stringToCellType(cellStr) {
  var batCell = 'NOT SET';
  switch(cellStr) {
    case 'Pan18650':
      batCell = Pan18650;
      break;
    case 'Gen18650':
      batCell = Gen18650;
      break;
    case 'TgyD':
      batCell = TgyD;
      break;
    case 'DclD':
      batCell = DclD;
      break;
    case 'DclC':
      batCell = DclC;
      break;
    case 'DclAA':
      batCell = DclAA;
      break;
    case 'DclAAA':
      batCell = DclAAA;
      break;
    case 'EnlAA':
      batCell = EnlAA;
      break;
    case 'EnlAAA':
      batCell = EnlAAA;
      break;
  } 
  return batCell;
}

function updateBatteryView() {
  // [
  //   [c1,c2,c3], 
  //   [c4,c5,c6]
  // ]
  var batStr = '[ ';
  for(var i=0; i<batteryHolder.length; i++) { // parallel
    batStr += ' [';
    for(var j=0; j<batteryHolder[i].length; j++) { // series
      batStr += ' == ';
    }
    batStr += '] ';
  }
  batStr += ' ] ';

  $("#batteryStatusArea").html(batStr);
}
