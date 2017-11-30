(function (app) {
  var trackerContainer = document.querySelector('.tracker-card-container');

  var renderCards = function (cardListArr) {
    trackerContainer.innerHTML = '';
    if (cardListArr.length > 0) {
      for (var i = 0; i < cardListArr.length; i++) {
        var title = cardListArr[i].title;
        var card = new app.TrackerCard(title, i, trackerContainer);
        card.createCard();
      }
    }
  };

  app.trackerCreator.activateTrackerCreator();

  app.EventBus.subscribe('newCardCreated', function (trackerTitle) {
    app.cardList.addCard({title: trackerTitle});
    renderCards(app.cardList.getCardList());
  });

  app.EventBus.subscribe('removeTrackerCard', function (index) {
    app.cardList.removeCard(index);
    renderCards(app.cardList.getCardList());
  });

  app.cardList.loadCardList();
  renderCards(app.cardList.getCardList());
})(window.app = window.app || {});
