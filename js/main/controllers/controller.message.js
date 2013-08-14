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
						cell0.innerHTML = '<i class="userIcon32"></i><div><span class="hiddenText">'+ contactArr[i].id +'</span>'+contactArr[i].name+'</div>';
						
						var messages = contactArr[i].messages;
						var cell1 = row.insertCell(1);
						var msgContent = [];
						for(var j=0; j<messages.length; j++) {
							msgContent.push('<div class="msg"><span class="hiddenText">'+ messages[j].id +'</span><i class="msgIcon16"></i>'+ messages[j].title+
							                '<span class="msgAction"><i class="delIcon10"></i></span></div>');
						}
						cell1.innerHTML = msgContent.join(' ');
					}
					
					$(".msg", table).each(function(){
						$(this).bind("mouseover", 
						             function(){ 
										$(".msgAction",this).css("display","inline");
							 }).bind("mouseout", 
							         function(){
										$(".msgAction",this).css("display","none");
							 })
					})
					
					$(".delIcon10").bind("click", function(){
						var msgNode = this.parentNode.parentNode;
						var msgId = $(".hiddenText", msgNode).text();
						var tdNode = $(msgNode.parentNode).prev()[0];
						var contactId = $(".hiddenText", tdNode).text();
						$.ajax({
							  type: 'POST',
							  url: WEB_ROOT+'/index.php/submission/disconnectMessage',
							  data: {'msgId':msgId, 'contactId':contactId},
							  success: function(data) {}							  
							  });
							  
						$(msgNode).remove();						
					})
				  }
			})
	}
	
	$scope.deleteMsg = function(mid) {
		$.ajax({
			type: 'post',
			url: WEB_ROOT+'/index.php/submission/delete',
			data: {id:mid},
			success: function(data) {
				for(var i=0;i<$scope.data.length; i++) {
					if($scope.data[i].id == mid){
						$scope.data.splice(i,1);
						$scope.$apply();
						break;
					  }
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
  
  init();
  
  function init(){
	$("input[name='typeMsg']").bind('click', function(){
		var value = $(this).val();
		$("#textDiv").css("display", value==1?"block":"none");
		$("#audioDiv").css("display", value==2?"block":"none");
		$("#videoDiv").css("display", value==3?"block":"none");
	})
	
	$("input[name='typeMsg']").eq(0).attr("checked", "true");
	$("#audioDiv").css("display", "none");
	$("#videoDiv").css("display", "none");
  }
	

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
	
	info.typeMsg =  $("input[type='radio']:checked").val();
	if(info.typeMsg == "1"){
		info.content = encodeURIComponent($scope.editor.html());
	}
	else if(info.typeMsg =="2"){
		info.content = document.forms["audioForm"].elements["mediaURL"].value;
	}
	else if(info.typeMsg =="3"){
		info.content = document.forms["audioForm"].elements["mediaURL"].value;
	}
	
	
	
	$.ajax({
      type: 'POST',
      url: WEB_ROOT+'/index.php/submission/save',
      data: info,
      success: function(data) {
		$scope.$apply( function(){
			$("#nav").show();
			$location.url("/messages?type=1");
			});
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
	$("#contactsDiv").empty();  //allow only one contact at a time
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
  
  $scope.uploadAudio = function(){
  alert();
  }
  

}

mylifeApp.directive("uploader", function(){
			return {
				restrict: 'E',
				template: '<div class="uploader">'+
								'<div>'+
									'<span class="linkLbl" style="display:none">Choose a file ...</span>'+
									'<input type="file" name="mfile" onchange="angular.element(this).scope().uploadFile(this)" />'+
									'<input type="submit" style="display:none" />'+
								'</div>'+
								'<div class="linkLbl" style="display:none"><i class="pinIcon16"></i><span class="fileName">name</span><i class="delIcon10"></i><i class="loaderIcon16" ></i><div>'+
							'</div>',
				replace: true,
				scope: {},
				link: function(scope, elem, attrs, ctrl){												
						$(".delIcon10", elem).bind('click', function(){
								$(this).parent().hide();
								$(this).parent().prev().show();
								
								var form = $(this).parents('form')[0];
								form.reset();
								form.elements["mediaURL"].value="";
						})
						
						var $form = $(elem).parents('form');
						$form.attr('action', WEB_ROOT+"/index.php/file/upload");
								
						$form.submit(function(){
							$(this).ajaxSubmit({
								success: function(data){
									var result = JSON.parse(data);
									if(result.error != '0') {
										alert(result.message);
										$(".delIcon10", $form[0]).trigger("click");
										return;
									}
									var ch = $(elem.children()[1]).children();
									ch[2].style.display = "";
									ch[3].style.display = "none";
									$form[0].elements["mediaURL"].value=result.url;
									
								},
							})
						});
							
					},
				controller: ['$scope', function ($scope) {
						$scope.uploadFile = function(el){							
							if($(el).val()=='')
								return false;
							
							$(el).next().trigger('click');
							
							$(el).parent().hide();
							var prt = $(el).parent().next().show();
							var ch = prt.children();
							ch[2].style.display = "none";
							ch[3].style.display = "";
							ch[1].innerHTML = $(el).val();
						}
					
					}],
			}
})