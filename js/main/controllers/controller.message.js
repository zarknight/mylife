'use strict';

function MessageListCtrl($scope, $http, $routeParams, $location) {
  $scope.type = (typeof $routeParams.type != "undefined")? ($routeParams.type):1;
  
  $scope.newMessage = function() {
    $location.url('/createMessage?type=create')
  }
  
  $scope.reloadMessage = function(){
	if($scope.type ==0) {
		$http.get(WEB_ROOT+'/index.php/submission/index?type='+$scope.type).success(function(data) {
		  $scope.data = data;
		});
		$("#pane1").show();
		$("#pane2").hide();
	}
	else {
		$http.get(WEB_ROOT+'/index.php/contact/groupIndex').success(function(data) {
			$scope.cdata = data;
		});
		
		$("#pane1").hide();
		$("#pane2").show();
	}
  }
  
  $scope.reloadMessage();
  
  $scope.toggle = function(event, obj){
		var target = event.currentTarget?event.currentTarget:event.srcElement;
		var containerDiv = target.parentNode.parentNode;
		var contentDiv = $(containerDiv).children()[1];
		
		if($(contentDiv).css("display")=="none"){
			$(target).removeClass("icon-plus").addClass("icon-minus");
			$(contentDiv).css("display","block");
			
			if(contentDiv.innerHTML=='')
				$scope.fillContentDiv(obj,contentDiv);
		}
		else{
			$(target).removeClass("icon-minus").addClass("icon-plus");
			$(contentDiv).css("display","none");
		}
		
	}
  	
	$scope.fillContentDiv = function(obj, parentDiv){
		var table = $('<table class="table"><colgroup><col width="20%"><col width="80%"></colgroup></table>').appendTo(parentDiv)[0];
		
		var info = {};
		info.to = obj.values;
		$.ajax({
		  type: 'POST',
		  url: WEB_ROOT+'/index.php/submission/indexByRecepient',
		  data: info,
		  success: function(data) {
					var contactArr = JSON.parse(data);
					
					for(var i=0; i<contactArr.length; i++){
						var row = table.insertRow(0);
						var cell0 = row.insertCell(0);
						cell0.innerHTML = '<i class="userIcon32"></i><div>'+contactArr[i].name+'</div>';
						
						var messages = contactArr[i].messages;
						var cell1 = row.insertCell(1);
						var msgContent = [];
						for(var j=0; j<messages.length; j++) {
							msgContent.push('<div><i class="msgIcon16"></i>'+ messages[j].title+'</div>');
						}
						cell1.innerHTML = msgContent.join(' ');
					}
					
				  }
			})
	}
	
}

/**********************************message edit controller**********************************************************************/

var editorSetting = {
  langType: 'en',
  resizeType: 0,
  items: [
	'source', '|',
    'fontname', 'fontsize', '|', 
    'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'removeformat', '|', 
    'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent','|', 
    'image', 'link'
  ],
  uploadJson: WEB_ROOT+"/index.php/file/upload",
}

function MessageEditCtrl($scope,$routeParams,$http,$location) {
  if ($routeParams.type == 'create') {
    $scope.title = "Create";
  } else {
    $scope.title = "Edit";
  }
  
  $scope.editor = KindEditor.create('#editContent', editorSetting);

  $("#nav").hide();

  $scope.discard = function(){
    var res = window.confirm("Are you sure to discard the message?");   
    if (res) {
      $("#nav").show();
      $location.url("/messages");
    }
  }
  
  $scope.save = function(){
	var info = {};
	info.to = [];
	$(".hiddenText", "#contactsDiv").each(function(){
		var val = this.innerHTML;
		if($.inArray(val, info.to) === -1) info.to.push(val);});
	
	info.title = $("#title").val();
	info.content = encodeURIComponent($scope.editor.html());
	
	$.ajax({
      type: 'POST',
      url: WEB_ROOT+'/index.php/submission/save',
      data: info,
      success: function(data) {
		$("#nav").show();
		$location.url("/messages?type=1");
      }
    })
    
  }
  
  $scope.send = function(){
    $("#nav").show();
    $location.url("/messages?type=1");
  }
  
  $scope.showContacts = function($event){
    if( typeof $scope.contactsData == "undefined") {
		$http.get(WEB_ROOT+'/index.php/contact/index').success(function(data) {
			$scope.contactsData = data;
			
			$("#contactListContent").children().bind("mouseover", function(){ $(this).children().css("background-color","#dddddd")})
				.bind("mouseout", function(){ $(this).children().css("background-color","#ffffff")});
			$scope.showContactListPop($event);
		  });
	}
	else {
		$scope.showContactListPop($event);
	}
	
  }
  
  $scope.showContactListPop = function($event){
	$("#contactListPop").show();
	$("#contactListPop").bind("click", function(event){event.stopPropagation();})
	$event.cancelBubble = true;
	$(window).bind("click", $scope.hideContactListPop);
  }
  
  $scope.hideContactListPop = function(){
	$("#contactListPop").hide();
	$(window).unbind("click", $scope.hideContactListPop);
  }
  
  $scope.clickOnContact = function($event){
	var name = $(".cname",$event.currentTarget).text();
	var id = $(".hiddenText",$event.currentTarget).text();
	var item = $('<div class="msg_contact_blc"><span class="hiddenText">'+ id +'</span><a class="msg_contact_btn"><span class="msg_contact_name">'+ name
       +'</span></a><a href="" class="msg_contact_btn"><span class="msg_contact_name"> x </span></a></div>').appendTo("#contactsDiv")
	$(".msg_contact_name", item).last().on("click", function(event){
											event.preventDefault();
											$(item).remove();
											$("#contactListPop").css("top", $("#contactsDiv").outerHeight());											
										});
	$("#contactListPop").css("top", $("#contactsDiv").outerHeight());
  }
  
  $scope.mouseoverContact = function($event){
	$($event.currentTarget).children().css("background-color","#dddddd");
  }
  
  $scope.mouseoutContact = function($event){
	$($event.currentTarget).children().css("background-color","#ffffff");
  }
  

}
