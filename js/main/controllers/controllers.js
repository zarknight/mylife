'use strict';

function MainCtrl($scope) {
  
}

function DashboardCtrl($scope) {

}

function ProfileCtrl($scope) {

}

function MessageListCtrl($scope, $http, $routeParams) {
	$scope.type = (typeof $routeParams.type != "undefined")? ($routeParams.type):1;
	
	
	$scope.newMessage = function() {
		window.location.href = "#/createMessage?type=create";
	}
	
	$scope.reloadMessage = function(){
		$http.get(WEB_ROOT+'/index.php/submission/index?type='+$scope.type).success(function(data) {
				$scope.data = data;
			});
	
	}
	
	$scope.reloadMessage();
}
var editorSetting = {
	langType: 'en',
	resizeType: 0,
	items: ['fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'removeformat', '|', 
	        'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent','|', 
			'image', 'link'],
}

function MessageEditCtrl($scope,$routeParams) {
    if($routeParams.type == 'create')
		$scope.title = "Create";
	else
		$scope.title = "Edit";
	
	var editor = KindEditor.create('#editContent', editorSetting);
				
	$("#nav").hide();
	
	$scope.discard = function(){
		var res = window.confirm("Are you sure to discard the message?");   
		if(res){
			$("#nav").show();
			window.location.href = "#/messages";
		}
	}
	
	$scope.save = function(){
			$("#nav").show();
			window.location.href = "#/messages?type=3";
			
	}
	
	$scope.send = function(){
			$("#nav").show();
			window.location.href = "#/messages?type=1";
			
	}

}

function ContactListCtrl($scope, $http) {
	$http.get(WEB_ROOT+'/index.php/contact/index').success(function(data) {
		$scope.data = data;
		
	});
	
	$scope.newContact = function(){  
		$('#newContactBtn').attr('disabled','disabled');
		$('#creatNewDiv').css('display','');
	}
	
	$scope.cancelNew = function(){  
		$('#newContactBtn').removeAttr('disabled');
		$('#creatNewDiv').css('display','none');
	}
	
	$scope.createNew = function(){
		$scope.cancelNew();
		var info = {};
		info.firstname = $("#newFN").val();
		info.lastname = $("#newLN").val();
		info.relation = $("#newRL").val();
		info.email = $("#newML").val();
		//$http.post(WEB_ROOT+'/index.php/contact/create', $.param(d)).success(function(data) {
		//});
		$.ajax({
			type: 'POST',
			url: WEB_ROOT+'/index.php/contact/create',
			data: info,
			success: function(data) {
			  var obj = JSON.parse(data);
			  $scope.data.unshift(obj);
			  $scope.$apply();
			}
			
		})
	}
	
	$scope.deleteContact = function(obj){
		var cid = obj.id;
		$.ajax({
			type: 'post',
			url: WEB_ROOT+'/index.php/contact/delete',
			data: {id:cid},
			success: function(data) {
				for(var i=0;i<$scope.data.length; i++) {
					if($scope.data[i].id == cid){
						$scope.data.splice(i,1);
						$scope.$apply();
						break;
					}
				}
			}
			
		})
	}
	
	$scope.editContact = function(obj) {
		$scope.dismissLastEdit();
		
		var cid = obj.id;
		$("#row_"+cid).attr("status", "inEdit");
		var cells = $("#row_"+cid).children();
		var value = $(cells[0]).text();
		$(cells[0]).children()[0].style.display="none";
		$(cells[0]).append($('<input id="editFN" type="text" class="span2" value="'+ value +'" />'));
		var value = $(cells[1]).text();
		$(cells[1]).children()[0].style.display="none";
		$(cells[1]).append($('<input id="editLN" type="text" class="span2" value="'+ value +'" />'));
		var value = $(cells[3]).text();
		$(cells[3]).children()[0].style.display="none";
		$(cells[3]).append($('<input id="editML" type="text" class="span2" value="'+ value +'" />'));
		
		var value = $(cells[2]).text();
		$(cells[2]).children()[0].style.display="none";
		$('<select id="editRL" class="span2" ></select>').html($("#newRL").html()).appendTo(cells[2])
														.find('option[value="'+value+'"]').attr("selected", true);
		
		$(cells[4]).children()[0].style.display="none";
		$(cells[4]).children()[1].style.display="";
	}
	
	$scope.cancelEdit = function(obj) {
		var cid = obj.id;
		$("#row_"+cid).removeAttr("status");
		var cells = $("#row_"+cid).children();
		
		for(var i=0; i<cells.length-1; i++){
			$(cells[i]).children()[0].style.display="";
			$(cells[i]).children().last().remove();
		}
		$(cells[4]).children()[0].style.display="";
		$(cells[4]).children()[1].style.display="none";
	}
	
	$scope.updateContact = function(obj) {
		var info = {};
		info.id = obj.id;
		info.firstname = $("#editFN").val();
		info.lastname = $("#editLN").val();
		info.relation = $("#editRL").val();
		info.email = $("#editML").val();
		
		$.ajax({
			type: 'post',
			url: WEB_ROOT+'/index.php/contact/update',
			data: info,
			success: function(data) {
				var o = JSON.parse(data);
				
				for(var i=0;i<$scope.data.length; i++) {
					if($scope.data[i].id == o.id){
						$scope.data[i] = o;
						$scope.$apply();
						break;
					}
				}
			}
		})
		
		$scope.cancelEdit(obj);
	}
	
	$scope.dismissLastEdit = function() {
		for(var i=0;i<$scope.data.length; i++) {
			if( typeof $("#row_"+$scope.data[i].id).attr("status") != "undefined" ){
				$scope.cancelEdit($scope.data[i]);
			}
		}
	}
}

mylifeApp.controller('MainCtrl', MainCtrl);
mylifeApp.controller('DashboardCtrl', DashboardCtrl);
mylifeApp.controller('ProfileCtrl', ProfileCtrl);
mylifeApp.controller('ContactListCtrl', ContactListCtrl);
