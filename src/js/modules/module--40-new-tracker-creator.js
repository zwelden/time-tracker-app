(function (app, window, document) {
  var trackerCreator = (function () {
    var trackerBtnQuery = 'input[name="addTracker"]';
    var trackerInputQuery = 'input[name="trackerTitle"]';
    var addTrackerBtn;
    var trackerInput;

    var cacheQueries = function () {
      addTrackerBtn = document.querySelector(trackerBtnQuery);
      trackerInput = document.querySelector(trackerInputQuery);
    };

    var activateTrackerCreator = function () {
      cacheQueries();
      addTrackerBtn.addEventListener('click', function () {
        var trackerTitle = trackerInput.value;
        if (trackerTitle !== '') {
          clearInput();
          publishNewCard(trackerTitle);
        } else {
          alertError();
        }
      });
    };

    var clearInput = function () {
      trackerInput.value = '';
    };

    var alertError = function () {
      window.alert('Please Enter A Title');
    };

    var publishNewCard = function (trackerTitle) {
      app.EventBus.publish('newCardCreated', trackerTitle);
    };

    return {activateTrackerCreator: activateTrackerCreator};
  })();
  app.trackerCreator = trackerCreator;
})(window.app = window.app || {}, window, document);
