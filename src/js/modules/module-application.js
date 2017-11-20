(function () {
  var timeCounterh2 = document.querySelector('.time-counter-h2');
  var time = new Date();
  var hours = 0;
  var minutes = 0;
  var totalSeconds = 1;
  var seconds;

  var timeSecondsStart = Math.floor(time.getTime() / 1000);

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

  // ************
  var timeTracker = function () {
    var time;
    var startTime;
    var lastStartTime;
    var workingTime = 0;
    var started = false;
    var isTracking = false;

    var startTracking = function () {
      if (!started) {
        time = new Date();
        startTime = time.getTime() / 1000;  // convert ms to s.
        lastStartTime = startTime;
        started = true;
      } else {
        lastStartTime = Date.now() / 1000;  // convert ms to s
      }
      isTracking = true;
    };

    var stopTracking = function () {
      var currentTime = Date.now() / 1000;   // convert ms to s
      var timeDif = currentTime - lastStartTime;
      workingTime += timeDif;
      isTracking = false;
    };

    var getTotalTime = function () {
      var currentTime = Date.now() / 1000;   // convert ms to s
      var timeDif = currentTime - startTime;
      return timeDif;
    };

    var getWorkingTime = function () {
      var currentWorkingTime;
      if (isTracking) {
        var currentTime = Date.now() / 1000;   // convert ms to s
        var timeDif = currentTime - lastStartTime;
        currentWorkingTime = workingTime += timeDif;
      } else {
        currentWorkingTime = workingTime;
      }
      return currentWorkingTime;
    };

    /**
    *
    * Helper Functions
    *
    */

    /**
    *
    * @param time integer -- convert an integer representing total seconds into
    * a string formatted as h:mm:ss
    */
    var convertTimeToString = function (time) {
      var hours = Math.floor(time / 3600);  // seconds to hours
      var minutes = time % 3600;  // seconds to remaining minutes
      var seconds = time % 60;  // seconds to remaining seconds
      var timeStr = '' + hours + ':' + twoDigitTime(minutes) + ':' + twoDigitTime(seconds);
      return timeStr;
    };

    var twoDigitTime = function (n) {
      var newN = ('0' + n).slice(-2);   // append number to string with 0 and take last two chars (0 + 12 = 12, 0 + 9 = 09)
      return newN;
    }


    return {
      startTracking: startTracking,
      stopTracking: stopTracking,
      getTotalTime: getTotalTime,
      getWorkingTime: getWorkingTime
    };
  }
})();
