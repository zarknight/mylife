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
		$save_path = dirname(dirname(dirname(__FILE__))).'/userlib/';
		$save_url = '../../userlib/';
		
		//allowed file type
		$ext_arr = array(
						'image' => array('gif', 'jpg', 'jpeg', 'png', 'bmp'),
						'flash' => array('swf', 'flv'),
						'media' => array('swf', 'flv', 'mp3', 'wav', 'wma', 'wmv', 'mid', 'avi', 'mpg', 'asf', 'rm', 'rmvb'),
						'file' => array('doc', 'docx', 'xls', 'xlsx', 'ppt', 'htm', 'html', 'txt', 'zip', 'rar', 'gz', 'bz2'),
					);
				
		
		
		if ($_FILES["imgFile"]["error"] > 0) {
			echo json_encode(array('error' => 1, 'message' => "Error occurs during uploading"));
			exit;
		}
		else {
		
			$file_type = explode('.',$_FILES["imgFile"]["name"]);
			if (in_array($file_type[1], $ext_arr['image']) === false &&
			    in_array($file_type[1], $ext_arr['flash']) === false &&
				in_array($file_type[1], $ext_arr['media']) === false &&
				in_array($file_type[1], $ext_arr['file']) === false) {
				
				echo json_encode(array('error' => 1, 'message' => "this type of file is not allowed to upload"));
				exit;
			}
			
			if (!file_exists($save_path)) {
				mkdir($save_path);
			}
			
			if (file_exists($save_path . $_FILES["imgFile"]["name"])) {
				echo json_encode(array('error' => 1, 'message' => $_FILES["imgFile"]["name"] . " already exists. "));
				exit;
			  }
			else  {
			  move_uploaded_file($_FILES["imgFile"]["tmp_name"],
								 $save_path . $_FILES["imgFile"]["name"]);
			  }
		}

		echo json_encode(array('error' => 0, 'url' => $save_url . $_FILES["imgFile"]["name"]));
		
	}

}
