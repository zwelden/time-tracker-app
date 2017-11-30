(function (app) {
  var addTrackerBtn = document.querySelector('input[name=addTracker]');
  var trackerContainer = document.querySelector('.tracker-card-container');

  var trackerList = [];
  var index = 0;
  addTrackerBtn.addEventListener('click', function () {
    var trackerInput = document.querySelector('input[name="trackerTitle"]');
    var trackerTitle = trackerInput.value;
    if (trackerTitle !== '') {
      //trackerInput.value = '';

      var card = new app.TrackerCard(trackerTitle, index, trackerContainer);
      card.createCard();

      index++;
    } else {
      window.alert('Please Enter A Title');
    }
  });
  app.trackerCreator.activateTrackerCreator();
  app.EventBus.subscribe('newCardCreated', function (trackerTitle) {
    console.log(trackerTitle);
    console.log('pubsubed');
  });
})(window.app = window.app || {});
