<?php

class ViewController extends Controller
{
	public $layout='//layouts/view';
	
	public function actionError() {
		$this->render('error');
	}
	
	public function actionIndex() {
		if(isset($_GET["id"]) && isset($_GET["cid"])){
			$msgId = $_GET["id"];
			$contactId = $_GET["cid"];
			
			$criteria=new CDbCriteria;     
			$criteria->compare('submissionid', $msgId);
			$criteria->compare('contactid', $contactId);
		
			$sc = SubmissionContact::model()->findAll($criteria);
			
			if(count($sc)==0) {
				$this->render('error');
				return;
			}
			
			$msg = Submission::model()->findByPk($msgId);
			$contact = Contact::model()->findByPk($contactId);
			$user = User::model()->findByPk($contact->userid);
			
			$this->render('msgView',
			              array('id'=>$_GET["id"].$_GET["cid"], 'type'=>$msg->submissiontype,
						        'contactName'=>($contact->firstname)." ".($contact->lastname),
								'userName'=>($user->firstname)." ".($user->lastname),
						        'msgContent'=>$msg->content, 
								'msgTitle'=>$msg->title));
		}
			
		else
			$this->render('error');
	}	

}