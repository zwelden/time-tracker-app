(function () {
  var timeCounterh2 = document.querySelector('.time-counter-h2');
  var time = new Date();
  var hours = 0;
  var minutes = 0;
  var totalSeconds = 1;
  var seconds;


  var startBtn = document.querySelector('button[name=startTime]');
  var stopBtn = document.querySelector('button[name=stopTime]');

  function calculateTimePassed () {
    seconds = totalSeconds % 60;
    if (totalSeconds > 0 && seconds === 0) {
      minutes++;
    }
    if (minutes > 59) {
      hours++;
      minutes = 0;
    }
    timeCounterh2.innerText = '' + hours + ':' + minutes + ':' + seconds;
    totalSeconds++;
  }

  var startTime;

  function stopTime () {
    clearInterval(startTime);
  }

  startBtn.addEventListener('click', function () {
    startTime = setInterval(calculateTimePassed, 1000);
  });

  stopBtn.addEventListener('click', stopTime);
})();
