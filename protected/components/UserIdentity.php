<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity extends CUserIdentity
{
	private $_id="dddd";
	/**
	 * Authenticates a user.
	 * The example implementation makes sure if the username and password
	 * are both 'demo'.
	 * In practical applications, this should be changed to authenticate
	 * against some persistent user identity storage (e.g. database).
	 * @return boolean whether authentication succeeds.
	 */
	public function authenticate()
	{
		$criteria=new CDbCriteria;     
		$criteria->compare('username',$this->username);      
		$criteria->compare('password',$this->password);		
		$data = new CActiveDataProvider('User', array( 'criteria'=>$criteria, )); 
		
		if($data->getItemCount()>0){
			$this->errorCode=self::ERROR_NONE;
			$this->_id = $data->getData()[0]['id'];
		}
		else
			$this->errorCode=self::ERROR_USERNAME_INVALID;
		
		return !$this->errorCode;
		
	/*	$users=array(
			// username => password
			'demo'=>'demo',
			'admin'=>'admin',
		);
		if(!isset($users[$this->username]))
			$this->errorCode=self::ERROR_USERNAME_INVALID;
		elseif($users[$this->username]!==$this->password)
			$this->errorCode=self::ERROR_PASSWORD_INVALID;
		else
			$this->errorCode=self::ERROR_NONE;
		return !$this->errorCode; */
	}
	
	public function register()
	{
		$user=new User;
		$user->username = $this->username;
		$user->password = $this->password;
		
		if($user->save()>0)
			return true;
		
		return false;
	}
	
	public function checkUserName(){
		$criteria=new CDbCriteria;     
		$criteria->compare('username',$this->username);	
		$data = new CActiveDataProvider('User', array( 'criteria'=>$criteria, )); 
		
		if($data->getItemCount()>0)
			return false;
		
		return true;
	}
	
	public function getId() {
		return $this->_id;
	}
}