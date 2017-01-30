describe('MainController', function() {
  beforeEach(module('isentiaGameApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.shuffleArray', function() {
    it('shuffles and returns shuffled array', function() {
      var $scope = {};
      var controller = $controller('MainController', { $scope: $scope });
      
      $scope.imageParts = [
        {arrIndex:"01", imgSrc: "img/parts/1.jpg"},
        {arrIndex:"02", imgSrc: "img/parts/2.jpg"},
        {arrIndex:"03", imgSrc: "img/parts/3.jpg"},
        {arrIndex:"04", imgSrc: "img/parts/4.jpg"},
        {arrIndex:"05", imgSrc: "img/parts/5.jpg"},
        {arrIndex:"06", imgSrc: "img/parts/6.jpg"},
        {arrIndex:"07", imgSrc: "img/parts/7.jpg"},
        {arrIndex:"08", imgSrc: "img/parts/8.jpg"},
        {arrIndex:"09", imgSrc: "img/parts/9.jpg"}
      ];
      var itemTest = $scope.imageParts[0].arrIndex;
      
      $scope.shuffledArray = $scope.shuffleArray($scope.imageParts);
      console.log(angular.mock.dump($scope.shuffledArray));
      expect(itemTest).not.toEqual($scope.shuffledArray[0].arrIndex);
    });

  });
});