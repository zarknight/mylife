<?php

class ContactController extends Controller
{
	/**
	 * @return array action filters
	 */
	public function filters()
	{
		return array(
			'accessControl', // perform access control for CRUD operations
			'postOnly + delete', // we only allow deletion via POST request
		);
	}

	/**
	 * Specifies the access control rules.
	 * This method is used by the 'accessControl' filter.
	 * @return array access control rules
	 */
	public function accessRules()
	{
		return array(
			array('allow',  // allow all users to perform 'index' and 'view' actions
				'actions'=>array('index','groupIndex','view'),
				'users'=>array('@'),
			),
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array('create','update'),
				'users'=>array('@'),
			),
			array('allow', // allow admin user to perform 'admin' and 'delete' actions
				'actions'=>array('admin','delete'),
				'users'=>array('@'),
			),
			array('deny',  // deny all users
				'users'=>array('*'),
			),
		);
	}

	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionView($id)
	{
		$this->render('view',array(
			'model'=>$this->loadModel($id),
		));
	}
	
	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		$currentUserId = Yii::app()->user->getId();

		$criteria=new CDbCriteria;     
		$criteria->compare('userid', $currentUserId);
		$dataProvider = new CActiveDataProvider('Contact', array( 'criteria'=>$criteria, )); 
		$data = $dataProvider->getData();
		$model = new Contact;

		$attributes = $model->attributeNames();

		$results = array();

		for($i=0; $i<count($data); $i++) {
			$result = array();
			foreach($attributes as $attr)
				$result[$attr] = $data[$i][$attr];
			$results[$i] = $result;
		}

		echo json_encode($results);
	}
	
	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate()
	{
		$contact=new Contact;
		$contact->userid = Yii::app()->user->getId();
		$contact->firstname = $_POST["firstname"];
		$contact->lastname = $_POST["lastname"];
		$contact->relation = $_POST["relation"];
		$contact->email = $_POST["email"];

		if($contact->save()>0){
			$attributes = $contact->attributeNames();
			$result = array();

			foreach($attributes as $attr)
				$result[$attr] = $contact[$attr];
			
			echo json_encode($result);
		}
	}

	public function actionGroupIndex()
	{
		$currentUserId = Yii::app()->user->getId();

		$criteria=new CDbCriteria;     
		$criteria->compare('userid', $currentUserId);
		$dataProvider = new CActiveDataProvider('Contact', array( 'criteria'=>$criteria, )); 
		$data = $dataProvider->getData();
		$model = new Contact;

		$attributes = $model->attributeNames();

		$tmp = array();

		for($i=0; $i<count($data); $i++) {
			$rel = $data[$i]["relation"];
			if(!isset($tmp[$rel]))
				$tmp[$rel] = array();
			
			array_push($tmp[$rel],$data[$i]["id"]);
		}
		
		$results = array();
		foreach($tmp as $key=>$value)
			array_push($results, array("rel"=>$key, "values"=>$value));
			
		echo json_encode($results);
	}
	
	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete()
	{
		$this->loadModel($_POST["id"])->delete();
	}
	
	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'view' page.
	 * @param integer $id the ID of the model to be updated
	 */
	public function actionUpdate()
	{
		$model=$this->loadModel($_POST["id"]);
		
		$model->relation = $_POST["relation"];
		$model->email = $_POST["email"];
		
		if($model->save()){
			$attributes = $model->attributeNames();
			$result = array();

			foreach($attributes as $attr)
				$result[$attr] = $model[$attr];
			
			echo json_encode($result);
		}
		
	}
	

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Contact('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Contact']))
			$model->attributes=$_GET['Contact'];

		$this->render('admin',array(
			'model'=>$model,
		));
	}

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer $id the ID of the model to be loaded
	 * @return Contact the loaded model
	 * @throws CHttpException
	 */
	public function loadModel($id)
	{
		$model=Contact::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

	/**
	 * Performs the AJAX validation.
	 * @param Contact $model the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='contact-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
}
