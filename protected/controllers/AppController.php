<?php

class AppController extends Controller
{
	public $layout='//layouts/app';

	public function actionIndex() {
		$this->render('index');
	}

}