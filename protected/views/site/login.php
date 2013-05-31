<?php
/* @var $this SiteController */
/* @var $model LoginForm */
/* @var $form CActiveForm  */

$this->pageTitle=Yii::app()->name . ' - Login';
?>

<div class="row-fluid">
	<div class="well span5 center login-box" >

		<div class="alert alert-info">
			<b>Login:</b><br/>
			Please log in with your username and password:
		</div>
		
		<div class="form">
			<?php /** @var BootActiveForm $form */
			$form = $this->beginWidget('bootstrap.widgets.TbActiveForm', array(
				'id'=>'loginForm',
				'type'=>'search',
				'htmlOptions'=>array('class'=>'well'),
			)); 
			?>

			<div class="formItem">
				<?php echo $form->textFieldRow($model, 'username', array('class'=>'input-medium', 'prepend'=>'<i class="icon-user"></i>')); ?>
				<?php echo $form->error($model,'username'); ?>
			</div>
				
			<div class="formItem">
				<?php echo $form->passwordFieldRow($model, 'password', array('class'=>'input-medium', 'prepend'=>'<i class="icon-lock"></i>')); ?>
				<?php echo $form->error($model,'password'); ?>
			</div>

			<div class="formItem">
				<?php echo $form->checkboxRow($model, 'rememberMe'); ?>

				<?php echo $form->error($model,'rememberMe'); ?>
			</div>

			<div class="formItem" >
				<div class="span6" style="float:none; display:inline-block; margin-top:20px">
				<?php 
				$this->widget('bootstrap.widgets.TbButton', array(
					'buttonType'=>'submit',
					'label'=>'Login',
					'type'=>'primary', 
					'htmlOptions'=>array('style'=>'width:100%'),
				));
				?>
				</div>
			</div>
			<?php $this->endWidget(); ?>
		</div>

		<a href="<?php echo $this->createUrl('site/register')?>">Register</a>

	</div>	
</div>