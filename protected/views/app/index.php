<?php
/* @var $this AppController */

?>

<div class="navbar">
	<div class="navbar-inner">
		<div class="container-fluid">
			<span class="logo">My Life</span>
		</div>
	</div>
</div>
     
<div class="container-fluid" ng-controller="MainCtrl">
	<div class="row-fliud">
		<div class="span2">
			<div class="well sidebar-nav" >	 
				 <ul class="nav nav-list" id="navList">
					<li class="active"><a href="#/dashboard">Dashboard</a></li>
					<li><a href="#/contacts">My Contacts</a></li>
					<li><a href="#/profile">My Profile</a></li>
					<li class="divider"></li>
					<li><a href="<?php echo $this->createUrl('site/logout')?>">Logout</a></li>
				</ul>
			</div>
		</div>
		<script>
			$("#navList").on('click', function(event){
				$(this).children().each(function(){
					$(this).removeClass("active");					
				})
				$(event.target).parent().addClass("active");
			})			
		</script>

			
		<div class="span10"> 
			<div ng-view></div>
		</div>
		 
	</div>
</div>

<!-- ***************** app scripts start ***************** -->
<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/main/app.js"></script>
<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/main/controllers/controllers.js"></script>
<!-- ***************** app scripts end ******************* -->