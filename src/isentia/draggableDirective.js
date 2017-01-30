"use strict";

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