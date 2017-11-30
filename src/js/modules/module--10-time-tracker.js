(function (app) {
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
        startTime = Math.floor(time.getTime() / 1000);  // convert ms to s.
        lastStartTime = startTime;
        started = true;
      } else {
        lastStartTime = getTimeNow();
      }
      isTracking = true;
    };

    var stopTracking = function () {
      var currentTime = getTimeNow();
      var timeDif = currentTime - lastStartTime;
      workingTime += timeDif;
      isTracking = false;
    };

    var getTotalTime = function () {
      var currentTime = getTimeNow();
      var timeDif = currentTime - startTime;
      return convertTimeToString(timeDif);
    };

    var getWorkingTime = function () {
      var currentWorkingTime;
      if (isTracking) {
        var currentTime = getTimeNow();
        var timeDif = currentTime - lastStartTime;
        currentWorkingTime = workingTime + timeDif;
      } else {
        currentWorkingTime = workingTime;
      }
      return convertTimeToString(currentWorkingTime);
    };

    var getTimeNow = function () {
      return Math.floor(Date.now() / 1000); // divide by 1000 to conver ms to s
    };

    /**
    *
    * @param time integer -- convert an integer representing total seconds into
    * an integer representing hours
    */
    var getHours = function (time) {
      return Math.floor(time / 3600);
    };

    /**
    *
    * @param time integer -- convert an integer representing total seconds into
    * an integer representing minutes
    */
    var getMinutes = function (time) {
      return Math.floor(time / 60) % 60;
    };

    /**
    *
    * @param time integer -- convert an integer representing total seconds into
    * an integer representing minutes
    */
    var getSeconds = function (time) {
      return time % 60;
    };

    /**
    *
    * @param time integer -- convert an integer representing total seconds into
    * a string formatted as h:mm:ss
    */
    var convertTimeToString = function (time) {
      var hours = getHours(time);
      var minutes = getMinutes(time);
      var seconds = getSeconds(time);
      var timeStr = '' + hours + ':' + twoDigitTime(minutes) + ':' + twoDigitTime(seconds);
      return timeStr;
    };

    /**
    *
    * @param n integer -- a time value to be returned as a string exactly
    * two digits long. Numbers < 10 have a 0 prepended (i.e. 0 + 12 = 12, 0 + 9 = 09)
    */
    var twoDigitTime = function (n) {
      var newN = ('0' + n).slice(-2);
      return newN;
    };

    return {
      startTracking: startTracking,
      stopTracking: stopTracking,
      getTotalTime: getTotalTime,
      getWorkingTime: getWorkingTime
    };
  };

  app.timeTracker = timeTracker;
})(window.app = window.app || {});
