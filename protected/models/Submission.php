<?php

/**
 * This is the model class for table "tbl_submission".
 *
 * The followings are the available columns in table 'tbl_submission':
 * @property integer $id
 * @property integer $userid
 * @property integer $eventid
 * @property string $title
 * @property string $content
 * @property string $description
 * @property integer $status
 * @property string $submission_date
 * @property string $create_date
 * @property string $update_date
 */
class Submission extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Submission the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'tbl_submission';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('userid', 'required'),
			array('userid, eventid, status', 'numerical', 'integerOnly'=>true),
			array('title', 'length', 'max'=>128),
			array('content, description, create_date, update_date', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, userid, eventid, title, content, description, status, submission_date, create_date, update_date', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'recepients' => array(self::MANY_MANY, 'Contact', 'tbl_submission_contact(contactid,submissionid)')
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'userid' => 'Userid',
			'eventid' => 'Eventid',
			'title' => 'Title',
			'content' => 'Content',
			'description' => 'Description',
			'status' => 'Status',
			'submission_date' => 'Submission Date',
			'create_date' => 'Create Date',
			'update_date' => 'Update Date',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('userid',$this->userid);
		$criteria->compare('eventid',$this->eventid);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('content',$this->content,true);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('status',$this->status);
		$criteria->compare('submission_date',$this->submission_date,true);
		$criteria->compare('create_date',$this->create_date,true);
		$criteria->compare('update_date',$this->update_date,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
	
	public function beforeSave() {
		if ($this->isNewRecord)
			$this->create_date = new CDbExpression('NOW()');
	 
		$this->update_date = new CDbExpression('NOW()');
	 
		return parent::beforeSave();
	}

}