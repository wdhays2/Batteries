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
});

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