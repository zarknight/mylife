<?php

class AppController extends Controller
{
	public $layout='//layouts/app';

	public function filters() {   
		return array(   
			'accessAuth',   
		);   
    }   

	public function filterAccessAuth($filterChain) {   
		if(Yii::app()->user->isGuest)
			$this->redirect(Yii::app()->homeUrl);
			
		$filterChain->run();  
	}

	
	public function actionIndex() {
		$this->render('index');
	}

}