(function (app, window, document) {
  var EventBus = {
    topics: {},

    subscribe: function (topic, listener) {
      // create the topic if not yet created
      if (!this.topics[topic]) this.topics[topic] = [];

      // add the listener
      this.topics[topic].push(listener);
    },

    publish: function (topic, data) {
      // return if the topic doesn't exist, or there are no listeners
      if (!this.topics[topic] || this.topics[topic].length < 1) return;

      // send the event to all listeners
      this.topics[topic].forEach(function (listener) {
        listener(data || {});
      });
    }
  };
  app.EventBus = EventBus;
})(window.app = window.app || {}, window, document);

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

(function (app) {
  /**
  *
  * @param title string -- title of the tracker card
  *
  * @param index integer -- index of the card of use in managing updates and deletions
  *
  */
  var TrackerCard = function (title, index, container) {
    this.title = title;
    this.index = index;
    this.container = container;
  };

  TrackerCard.prototype.cardInner = function () {
    return '<div class="c-tracker-card__inner">' +
              '<div class="tracker-info">' +
                '<h2 class="tracker-info__title">' + this.title + '<h2>' +
              '</div>' +
              '<div class="tracker-clock-wrapper">' +
                '<h3 class="tracker-clock">0:00:00</h3>' +
                '<div class="tracker-controls">' +
                  '<button class="" type="button" name="startStop"><i class="fa fa-play"></i></button>' +
                '</div>' +
              '</div>' +
              '<div class="card-actions">' +
                '<div class="tracker-delete">' +
                  '<button class="btn-warning" type="button" name="deleteCard"><i class="fa fa-trash"></i></button>' +
                '</div>' +
                '<div class="tracker-edit">' +
                  '<button class="" type="button" name="editCard"><i class="fa fa-edit"></i></button>' +
                '</div>' +
              '</div>' +
            '</div>';
  };

  TrackerCard.prototype.createCard = function () {
    this.trackerCard = document.createElement('div');
    this.trackerCard.classList.add('c-tracker-card');
    this.trackerCard.dataset['index'] = this.index;
    this.trackerCard.innerHTML = this.cardInner();

    this.appendCard();
    this.cacheQueries();
    this.activateTimer();
    this.activateEventListeners();
  };

  TrackerCard.prototype.appendCard = function () {
    this.container.append(this.trackerCard);
  };

  TrackerCard.prototype.cacheQueries = function () {
    this.trackerClock = this.trackerCard.querySelector('.tracker-clock');
    this.startStopBtn = this.trackerCard.querySelector('button[name=startStop');
    this.deleteCardBtn = this.trackerCard.querySelector('button[name=deleteCard]');
  };

  TrackerCard.prototype.updateTime = function () {
    this.trackerClock.innerText = this.timeTracker.getWorkingTime();
  };

  TrackerCard.prototype.activateTimer = function () {
    this.timeTracker = app.timeTracker();
    this.isTracking = false;
    this.updater = null;
  };

  TrackerCard.prototype.activateEventListeners = function () {
    var _this = this;
    this.startStopBtn.addEventListener('click', function () {
      if (!_this.isTracking) {
        _this.timeTracker.startTracking();
        _this.updater = setInterval((function (_this) {
          return function () {
            _this.updateTime();
          };
        })(_this), 200);
        _this.isTracking = true;
        this.innerHTML = '<i class="fa fa-pause"></i>';
        this.classList.add('tracking-active');
      } else {
        _this.timeTracker.stopTracking();
        clearInterval(_this.updater);
        _this.isTracking = false;
        this.innerHTML = '<i class="fa fa-play"></i>';
        this.classList.remove('tracking-active');
      }
    });
    this.deleteCardBtn.addEventListener('click', function () {
      var index = _this.trackerCard.dataset['index'];
      var parent = _this.container;
      var element = parent.querySelector('[data-index="' + index + '"]');
      parent.removeChild(element);
    });
  };

  app.TrackerCard = TrackerCard;

  // test
  // var content = document.querySelector('.tracker-card-container');
  // var card = new app.TrackerCard('test', 0, content);
  // card.createCard();
  // card.appendCard();
  // card.cacheQueries();
  // card.activateTimer();
  // card.activateEventListener();
})(window.app = window.app || {});

(function (app, window, document) {
  var cardManager = (function () {
    var storageVariable = 'timerCardList';
    var cardList = [];

    var getCardList = function () {
      var localStorageStr = window.localStorage.getItem(storageVariable);
      if (localStorageStr) {
        cardList = JSON.parse(localStorageStr);
      }
      return cardList;
    };

    var saveCardList = function () {
      var cardListStr = JSON.stringify(cardList);
      window.localStorage.setItem(storageVariable, cardListStr);
    };

    var addCard = function (cardObj) {
      cardList.push(cardObj);
      saveCardList();
    };

    var removeCard = function (index) {
      cardList.splice(index, 1);
      saveCardList();
    };

    var updateCard = function (index, cardObj) {
      cardList[index] = cardObj;
      saveCardList();
    };

    return {
      getCardList: getCardList,
      saveCardList: saveCardList,
      addCard: addCard,
      removeCard: removeCard,
      updateCard: updateCard
    };
  })();
  app.cardManager = cardManager;
})(window.app = window.app || {}, window, document);

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
