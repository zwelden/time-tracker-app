(function (app) {
  var tracker = app.timeTracker();
  var timeCounterH2 = document.querySelector('.time-counter-h2');
  var startBtn = document.querySelector('button[name=startTime]');
  var stopBtn = document.querySelector('button[name=stopTime]');

  var updateTime = function () {
    timeCounterH2.innerText = tracker.getWorkingTime();
  };

  var updater;

  startBtn.addEventListener('click', function () {
    tracker.startTracking();
    updater = setInterval(updateTime, 200);
  });

  stopBtn.addEventListener('click', function () {
    tracker.stopTracking();
    clearInterval(updater);
  });
})(window.app = window.app || {});
