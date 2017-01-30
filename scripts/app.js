var isentiaGameApp = angular.module('isentiaGameApp', ['ui.router']);

//route
isentiaGameApp.config(function($stateProvider, $urlRouterProvider){ 
	$stateProvider 
		.state('home', {
			url: '/',
			views : {
				'content': {
				templateUrl: 'templates/main.html',
				controller: 'MainController'
				}
			}
		});
		$urlRouterProvider.otherwise("/");
})

//controller
isentiaGameApp.controller('MainController', function($scope, $filter, $interval){
	$scope.gameSuccess = false;
	$scope.totalMovesCount = localStorage.getItem("savedGameMoves") ? parseInt(localStorage.getItem("savedGameMoves")) : 0;
	$scope.isDraggable = false;
	$scope.dragElem = null;
	
	var savedCountdown = localStorage.getItem("savedTimerValue");
	$scope.counter = 0;
	$scope.initialCountdown =   savedCountdown && savedCountdown != 0 ? parseInt(savedCountdown) : 0;
	$scope.showTimer =  savedCountdown && savedCountdown != 0 ? true : false;
	$scope.countdown = $scope.initialCountdown;
	
	$scope.imageParts = [
	{arrIndex:"01", imgSrc: "img/parts/1.jpg"},
	{arrIndex:"02", imgSrc: "img/parts/2.jpg"},
	{arrIndex:"03", imgSrc: "img/parts/3.jpg"},
	{arrIndex:"04", imgSrc: "img/parts/4.jpg"},
	{arrIndex:"05", imgSrc: "img/parts/5.jpg"},
	{arrIndex:"06", imgSrc: "img/parts/6.jpg"},
	{arrIndex:"07", imgSrc: "img/parts/7.jpg"},
	{arrIndex:"08", imgSrc: "img/parts/8.jpg"},
	{arrIndex:"09", imgSrc: "img/parts/9.jpg"}];
	
	$scope.colsLength = $scope.imageParts.length;
	
	$scope.puzzleKey = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];
	$scope.rowsLength = 3;
	
	
	$scope.shuffleArray = function (array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}
	
	$scope.getSavedArray = function(imgState){
		var imgStateArray = imgState.split(',');
		var returnArray = [];
		for (var i = 0; i < imgStateArray.length; i++){
			var found = $filter('filter')($scope.imageParts, {arrIndex: imgStateArray[i]}, true);
			returnArray.push(found[0]);
		}
		return returnArray;
	}
	
	var savedImgStates = localStorage.getItem("savedGameState");
	
	$scope.randomImageParts = savedImgStates && savedImgStates.length > 0 ? $scope.getSavedArray(savedImgStates) : $scope.shuffleArray($scope.imageParts);

	$scope.startGame = function (){
		$scope.isDraggable = true;
		$scope.showTimer = true;
		$scope.startTimer($scope.initialCountdown);
	}
	$scope.isGameOver = function() {
		$scope.totalMovesCount = $scope.totalMovesCount + 1;
		localStorage.setItem("savedGameMoves", $scope.totalMovesCount);
		
		var cols = document.querySelectorAll('#puzzle li');
		var puzzleArray = [];
		for (var i = 0; i < $scope.colsLength; i++) {
			puzzleArray.push(cols[i].children[0].getAttribute('data-img-index'));
		};
		
		localStorage.setItem("savedGameState", puzzleArray);
		
		var originKey = $scope.puzzleKey.join();
		var userKey = puzzleArray.join();

		if (originKey === userKey) {
			$scope.gameSuccess = true;
			localStorage.removeItem("savedGameState");
			localStorage.removeItem("savedGameMoves");
			localStorage.removeItem("savedTimerValue");
			$scope.stopTimer();
			localStorage.setItem("savedTimerValue", 0);
		}
		$scope.$apply();

	};
	
	$scope.dragStartHandler = function (e) {
		if ($scope.isDraggable == false){
			return false;
		}
		$scope.dragElem = this;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/html', this.innerHTML);
	};
	
	$scope.dragOverHandler = function (e) {
		e.preventDefault();
		e.stopPropagation();
		e.dataTransfer.dropEffect = 'move';
	};

	$scope.dragLeaveHandler = function (e) {
	};

	$scope.dragDropHandler = function (e) {
		if ($scope.isDraggable == false){
			return false;
		}
		e.preventDefault();
		e.stopPropagation();
		if ($scope.dragElem.innerHTML != this.innerHTML) {
			$scope.dragElem.innerHTML = this.innerHTML;
			this.innerHTML = e.dataTransfer.getData('text/html');
			$scope.isGameOver();
		}
		
	};

})

//directive
isentiaGameApp.directive('draggable', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
	  element[0].addEventListener('dragstart', scope.dragStartHandler, false);
      element[0].addEventListener('dragover', scope.dragOverHandler, false);
      element[0].addEventListener('dragleave', scope.dragLeaveHandler, false);
      element[0].addEventListener('drop', scope.dragDropHandler, false);
    }
  }
});

//filter
isentiaGameApp.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])


