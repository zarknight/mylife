'use strict';

function ContactListCtrl($scope, $http) {
  $http.get(WEB_ROOT+'/index.php/contact/index').success(function(data) {
    $scope.data = data;
  });
  
  initForm("newForm");
  
  function initForm(form){
	$("#"+form+" #typeRL1").bind('click', function(){ 
		$(this).next().removeAttr("disabled");
		$("#"+form+" #typeRL2").next().attr("disabled","true")});
	$("#"+form+" #typeRL2").bind('click', function(){ 
		$(this).next().removeAttr("disabled");
		$("#"+form+" #typeRL1").next().attr("disabled","true")})
		
	$("#"+form+" #typeRL1").attr("checked", true);
	$("#"+form+" #typeRL2").next().attr("disabled","true");
  }
  
  function resetForm(form){
	$("#"+form+" #newFN").val("");
	$("#"+form+" #newLN").val("");
	$("#"+form+" #newRL").val("");
	$("#"+form+" #newRL2").val("");
	$("#"+form+" #newML").val("");
  }
  
  $scope.newContact = function(){  
    $('#newContactBtn').attr('disabled','disabled');
    $('#creatNewDiv').slideDown(1000);
  }
  
  $scope.cancelNew = function(){  
    $('#newContactBtn').removeAttr('disabled');
    $('#creatNewDiv').slideUp(1000, function(){ resetForm("newForm")});
  }
  
  $scope.createNew = function(){
    var info = {};
    info.firstname = $("#newForm #newFN").val();
    info.lastname = $("#newForm #newLN").val();
	
	if(info.firstname.split(' ').join('') == '' && info.lastname.split(' ').join('') == ''){
		alert("please put first name and last name")
		return;
	}
	
	if(typeof $("#newForm #newRL").attr("disabled") == "undefined")
		info.relation = $("#newForm #newRL").val();
	else
		info.relation = $("#newForm #newRL2").val();
		
    info.email = $("#newForm #newML").val();
	
    $.ajax({
      type: 'POST',
      url: WEB_ROOT+'/index.php/contact/create',
      data: info,
      success: function(data) {
        var obj = JSON.parse(data);
        $scope.data.unshift(obj);
        $scope.$apply();
		resetForm("newForm");
      }
      
    })
  }
  
  $scope.createNewAndClose = function(){
	$scope.cancelNew();
	$scope.createNew();
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
    var value = $(cells[3]).text();
    $(cells[3]).children()[0].style.display="none";
    $(cells[3]).append($('<input id="editML" type="text" class="span2" value="'+ value +'" />'));
    
    var value = $(cells[2]).text();
    $(cells[2]).children()[0].style.display="none";
	var tempDiv = $('<div id="tempDiv"></div>').appendTo(cells[2]);
	$("#newForm #newRL").parent().clone().appendTo(tempDiv);
	$("#newForm #newRL2").parent().clone().appendTo(tempDiv);	
	initForm("tempDiv");
	
	var el = $('option[value="'+value+'"]', tempDiv);
	if(el.size()>0){
		el.attr("selected", true);
	}
	else {
		$("#tempDiv #typeRL2").attr("checked", true)
							  .next().removeAttr("disabled").val(value);
		$("#tempDiv #typeRL1").next().attr("disabled","true");
	}
	
    $(cells[4]).children()[0].style.display="none";
    $(cells[4]).children()[1].style.display="";
  }
  
  $scope.cancelEdit = function(obj) {
    var cid = obj.id;
    $("#row_"+cid).removeAttr("status");
    var cells = $("#row_"+cid).children();
    
    for(var i=2; i<cells.length-1; i++){
      $(cells[i]).children()[0].style.display="";
      $(cells[i]).children().last().remove();
    }
    $(cells[4]).children()[0].style.display="";
    $(cells[4]).children()[1].style.display="none";
  }
  
  $scope.updateContact = function(obj) {
    var info = {};
    info.id = obj.id;
    if(typeof $("#tempDiv #newRL").attr("disabled") == "undefined")
		info.relation = $("#tempDiv #newRL").val();
	else
		info.relation = $("#tempDiv #newRL2").val();
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

