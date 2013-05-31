<?php
/* @var $this AppController */

?>

<div class="container-fluid" ng-controller="MainCtrl">

  <div class="btn-toolbar">
    <a class="btn" href="#/dashboard">Dashboard</a>
    <a class="btn" href="#/profile">My Profile</a>
    <a class="btn" href="#/contacts">Contacts</a>
    <a class="btn" href="<?php echo $this->createUrl('site/logout')?>">Logout</a>
  <div>

  <div ng-view></div>

</div>

<!-- ***************** app scripts start ***************** -->
<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/main/app.js"></script>
<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/main/controllers/controllers.js"></script>
<!-- ***************** app scripts end ******************* -->