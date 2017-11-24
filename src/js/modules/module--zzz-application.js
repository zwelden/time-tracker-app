(function (app) {
  var addTrackerBtn = document.querySelector('input[name=addTracker]');
  var trackerContainer = document.querySelector('.tracker-card-container');

  var trackerList = [];
  var index = 0;
  addTrackerBtn.addEventListener('click', function () {
    var trackerInput = document.querySelector('input[name="trackerTitle"]');
    var trackerTitle = trackerInput.value;
    if (trackerTitle !== '') {
      trackerInput.value = '';

      var card = new app.TrackerCard(trackerTitle, index, trackerContainer);
      card.createCard();
      card.appendCard();
      card.cacheQueries();
      card.activateTimer();
      card.activateEventListeners();

      index++;
    } else {
      window.alert('Please Enter A Title');
    }
  });
})(window.app = window.app || {});
