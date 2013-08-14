<?php

class FileController extends Controller
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
				'actions'=>array('upload'),
				'users'=>array('@'),
			),
			array('deny',  // deny all users
				'users'=>array('*'),
			),
		);
	}

	public function actionUpload()
	{  
		$media_type = array(
							'image' => array('gif', 'jpg', 'jpeg', 'png', 'bmp'),
							'audio' => array('mp3'),
							'video' => array('mp4'),
						); 
					
		$currentUserId = Yii::app()->user->getId();
		$save_path = dirname(dirname(dirname(__FILE__))).'/userlib/'.$currentUserId.'/';
		$save_url = '../../userlib/'.$currentUserId.'/';
		
		$fileName = "imgFile";
		$allowedType = $media_type['image'];
		
		if(isset($_POST["mediaType"])){
			$fileName = "mfile";
			if($_POST["mediaType"] == "2")
				$allowedType = $media_type['audio'];
			else
				$allowedType = $media_type['video'];
		}
		
		if ($_FILES[$fileName]["error"] > 0) {
			echo json_encode(array('error' => 1, 'message' => "Error occurs during uploading"));
			exit;
		}
		else {
		
			$file_type = explode('.',$_FILES[$fileName]["name"]);
			if (in_array($file_type[1], $allowedType) === false) {				
				echo json_encode(array('error' => 1, 'message' => "this type of file is not allowed to upload"));
				exit;
			}
			
			if (!file_exists($save_path)) {
				mkdir($save_path);
			}
			
			if (file_exists($save_path . $_FILES[$fileName]["name"])) {
				echo json_encode(array('error' => 1, 'message' => $_FILES[$fileName]["name"] . " already exists. "));
				exit;
			  }
			else  {
			  move_uploaded_file($_FILES[$fileName]["tmp_name"],
								 $save_path . $_FILES[$fileName]["name"]);
			  }
		}

		echo json_encode(array('error' => 0, 'url' => $save_url . $_FILES[$fileName]["name"]));
		
	}
	

}
