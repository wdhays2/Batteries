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
    updatePage();
    updateBatteryView();
    $("#userAmps").val(0);
    $("#userVolts").val(0);
    $("#userPrice").val();
  });  
});


// Global Variables
// ---------------------------
var batteryHolder;
var custPrice;
var wantVolts = 0;
var wantAmps = 0;
var wantPrice = 0;
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
  wantVolts = parseInt($("#userVolts").val()); 
  console.log(wantVolts);
  $("#userInputSer").val(suggestVolts());
  if (suggestVolts() < 0){
    $("#userVolts").addClass("error");
  } else {
      $("#userVolts").removeClass("error");
    } 
  
}

function calcAmps(){  
  wantAmps = parseInt($("#userAmps").val());  
  console.log(wantAmps);
  $("#userInputPar").val(suggestAmps());
  if (suggestAmps() < 0){
    $("#userAmps").addClass("error");
  } else {
      $("#userAmps").removeClass("error");
    } 
}

function calcPrice(){  
  wantPrice = $("#userPrice").val();
  if (wantPrice * 1.21 > custPrice){
    $("#userPrice").addClass("error");
  } else {
      $("#userPrice").removeClass("error");
    } 
  console.log(wantPrice);
}

function stringToCellType(cellStr) {
  var batCell = 'NOT SET';
  switch(cellStr) {
    case 'Pan18650': batCell = Pan18650; break;
    case 'Gen18650': batCell = Gen18650; break;
    case 'TgyD': batCell = TgyD; break;
    case 'DclD': batCell = DclD; break;
    case 'DclC': batCell = DclC; break;
    case 'DclAA': batCell = DclAA; break;
    case 'DclAAA': batCell = DclAAA; break;
    case 'ElpAA': batCell = ElpAA; break;
    case 'ElpAAA': batCell = ElpAAA; break;
  } 
  return batCell;
}

function displayVolts(){
  var custVolts = checkVolts(batteryHolder);
  $("#actualVolts").html(custVolts);
  return custVolts;
}

function displayAmps(){
  var custAmps = checkAmps(batteryHolder);
  $("#actualAmps").html(custAmps);
  return custAmps;
}

function displayPrice(){
  custPrice = totalPrice(batteryHolder);
  $("#totalPrice").html(custPrice);
  return custPrice;
}

function updatePage(){ 
  displayVolts();
  displayAmps();
  displayPrice();
  suggestPrice();
}

function suggestAmps(){
  var batCell = stringToCellType( $("#cellOptions").val() );  
  return matchUserAmps(new batCell(), wantAmps);  
}

function suggestVolts(){
  var batCell = stringToCellType( $("#cellOptions").val() );
  return matchUserVolts(new batCell(), wantVolts);
}

function suggestPrice(){
  var batCell = stringToCellType( $("#cellOptions").val() );
  return matchUserPrice(new batCell(), wantPrice);
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
    batStr += '] <br>';
  }
  batStr += ' ] ';

  $("#batteryStatusArea").html(batStr);
}      