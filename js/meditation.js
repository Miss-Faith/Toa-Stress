let totalTime = 7500;
let breathTime = (totalTime * 0.4);
let holdTime = (totalTime * 0.2);

function breathAnimation () {

  $(".main-container").addClass("grow");
  $(".breath").text('Breath In!');

  setTimeout (function() {
    $(".breath").text('Hold');

    setTimeout (function() {
    $(".breath").text('Breath Out!');
    $(".main-container").addClass("shrink");
    }, holdTime);
  }, breathTime);
}

setInterval(breathAnimation, totalTime);
