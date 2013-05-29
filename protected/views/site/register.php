<?php
/* @var $this SiteController */
/* @var $model LoginForm */
/* @var $form CActiveForm  */

$this->pageTitle=Yii::app()->name . ' - Register';
$this->breadcrumbs=array(
	'Register',
);
?>
<div class="row-fluid">
	<div class="well span5 center login-box" >
		
		<div class="alert alert-info">
			<b>Register:</b><br/>
			Please fill out the form with your login credentials:
		</div>

		<div class="form" style>
		<?php $form=$this->beginWidget('bootstrap.widgets.TbActiveForm', array(
			'id'=>'registerForm',
			'type'=>'search',
			'htmlOptions'=>array('class'=>'well'),

		)); ?>

			<div class="formItem">
				<?php echo $form->textFieldRow($model, 'username', array('class'=>'input-medium', 'prepend'=>'<i class="icon-user"></i>')); ?>
				<?php echo $form->error($model,'username'); ?>
			</div>
				
			<div class="formItem">
				<?php echo $form->passwordFieldRow($model, 'password', array('class'=>'input-medium', 'prepend'=>'<i class="icon-lock"></i>')); ?>
				<?php echo $form->error($model,'password'); ?>
			</div>
			
			<div class="formItem">
				<?php echo $form->passwordFieldRow($model, 'password2', array('class'=>'input-medium', 'prepend'=>'<i class="icon-lock"></i>')); ?>
				<?php echo $form->error($model,'password2'); ?>
			</div>

			<div class="formItem" >
				<div class="span6" style="float:none; display:inline-block; margin-top:20px">
				<?php $this->widget('bootstrap.widgets.TbButton', array(
					'buttonType'=>'submit',
					'label'=>'Register',
					'type'=>'primary', 
					'htmlOptions'=>array('style'=>'width:100%'),
					
				)); ?>
				</div>
			</div>
			
		<?php $this->endWidget(); ?>
		</div><!-- form -->

		
		<a href="<?php echo Yii::app()->request->baseUrl; ?>/index.php?r=site/login">Login</a>
		
	</div>	
</div>
