(function (app, window, document) {
  var cardList = (function () {
    var storageVariable = 'timerCardList';
    var cardListArr = [];

    var loadCardList = function () {
      var localStorageStr = window.localStorage.getItem(storageVariable);
      if (localStorageStr !== null) {
        cardListArr = JSON.parse(localStorageStr);
      }
    };

    var saveCardList = function () {
      var cardListStr = JSON.stringify(cardListArr);
      window.localStorage.setItem(storageVariable, cardListStr);
    };

    var getCardList = function () {
      return cardListArr;
    };

    var addCard = function (cardObj) {
      cardListArr.push(cardObj);
      saveCardList();
    };

    var removeCard = function (index) {
      cardListArr.splice(index, 1);
      saveCardList();
    };

    var updateCard = function (index, cardObj) {
      cardListArr[index] = cardObj;
      saveCardList();
    };

    return {
      loadCardList: loadCardList,
      getCardList: getCardList,
      saveCardList: saveCardList,
      addCard: addCard,
      removeCard: removeCard,
      updateCard: updateCard
    };
  })();
  app.cardList = cardList;
})(window.app = window.app || {}, window, document);
