let totalTime = 8000;
let breathTime = (totalTime * 0.4);
let holdTime = (totalTime * 0.2);

function breathAnimation () {

  $(".main-container").addClass("grow").removeClass("shrink");
  $("#breath").text('Breath In!');

  setTimeout (function() {
    $("#breath").text('Hold');

    setTimeout (function() {
    $("#breath").text('Breath Out!');
    $(".main-container").removeClass("grow").addClass("shrink");
    }, holdTime);
  }, breathTime);
}

setInterval(breathAnimation, totalTime);

document.getElementById("playAudio").autoplay;
