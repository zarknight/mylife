<?php

class ViewController extends Controller
{
	public $layout='//layouts/view';
	
	public function actionError() {
		$this->render('error');
	}
	
	public function actionIndex() {
		if(isset($_GET["id"]))
			$this->render('msgView');
		else
			$this->render('error');
	}
	

}