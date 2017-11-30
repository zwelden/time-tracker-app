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
