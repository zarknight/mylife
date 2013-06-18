<?php /* @var $this Controller */ ?>
<!DOCTYPE html>
<html ng-app="mylifeApp">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title><?php echo CHtml::encode($this->pageTitle); ?></title>
	
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/themes/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/themes/css/bootstrap-responsive.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/style.css" />
  
  <script type="text/javascript">
    var WEB_ROOT = '<?php echo Yii::app()->request->baseUrl; ?>';
  </script>
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/angular/angular.min.js"></script>
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/jquery/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/editor/kindeditor.js"></script>
</head>
<body>
	<?php echo $content; ?>
</body>
</html>
