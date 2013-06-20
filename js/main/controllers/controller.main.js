'use strict';

function MainCtrl($scope, $location) {
  $("#navList").click(function(event){
		$(this).children().removeClass("active");
		$(event.target).parent().addClass("active");
	});

  var path = $location.path();

  if (path) {
    $('#navList').find('a[href="#' + path + '"]').parent().addClass("active");
  } else {
    $('#navList').find('a[href="#/dashboard"]').parent().addClass("active");
  }
}
