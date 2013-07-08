<?php

class SubmissionController extends Controller
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
				'actions'=>array('index','view','save'),
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
		$attributes = array('id','title','create_date');
		
		$currentUserId = Yii::app()->user->getId();

		$criteria=new CDbCriteria;     
		$criteria->compare('userid', $currentUserId);
		$criteria->compare('status', $_REQUEST['type']);
		$criteria->select = $attributes;
		$dataProvider = new CActiveDataProvider('Submission', array( 'criteria'=>$criteria, )); 
		$data = $dataProvider->getData();

		$results = array();
		for($i=0; $i<count($data); $i++) {
			$result = array();
			foreach($attributes as $attr)
				$result[$attr] = $data[$i][$attr];
			$results[$i] = $result;
		}

		echo json_encode($results);
	}
	
	public function actionSave()
	{
		$submission=new Submission;
		if(isset($_POST["id"])) {
			$submission = Submission::model()->findByPk($_POST["id"]);
			$submission->title = $_POST["title"];
			$submission->content = $_POST["content"];
			$submission->status = 3;
			$submission->update();
			
			//delete old contacts of submission
			SubmissionContact::model()->deleteAll('submissionid=:sid',array(':sid'=>($submission->id)));
		}
		else {
			$submission=new Submission;
			$submission->userid = Yii::app()->user->getId();
			$submission->title = $_POST["title"];
			$submission->content = $_POST["content"];
			$submission->status = 3;
			$submission->save();
		}
		
		if(isset($_POST["to"])){
			$cidList = $_POST["to"];
			foreach($cidList as $cid) {
				$submissionContact = new SubmissionContact;
				$submissionContact->contactid = (int)$cid;
				$submissionContact->submissionid = $submission->id;
				$submissionContact->save();
			}
			
		}
	}
	
	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate()
	{
		$model=new Submission;

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Submission']))
		{
			$model->attributes=$_POST['Submission'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->id));
		}

		$this->render('create',array(
			'model'=>$model,
		));
	}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'view' page.
	 * @param integer $id the ID of the model to be updated
	 */
	public function actionUpdate($id)
	{
		$model=$this->loadModel($id);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Submission']))
		{
			$model->attributes=$_POST['Submission'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->id));
		}

		$this->render('update',array(
			'model'=>$model,
		));
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete($id)
	{
		$this->loadModel($id)->delete();

		// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
		if(!isset($_GET['ajax']))
			$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
	}

	

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Submission('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Submission']))
			$model->attributes=$_GET['Submission'];

		$this->render('admin',array(
			'model'=>$model,
		));
	}

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer $id the ID of the model to be loaded
	 * @return Submission the loaded model
	 * @throws CHttpException
	 */
	public function loadModel($id)
	{
		$model=Submission::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

	/**
	 * Performs the AJAX validation.
	 * @param Submission $model the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='submission-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
}
