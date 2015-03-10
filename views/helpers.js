$( document ).ready(function() {
  $("#cellOptions").change(function() {
    helloworld();  // you should really  call a controller function here.
  });
});

function helloworld() {
  console.log("HERE");
}