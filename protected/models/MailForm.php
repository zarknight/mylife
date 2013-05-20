<?php

class MailForm extends CFormModel {

    public $from;
    public $to;
    public $subject;
    public $body;

    public function rules() {
        return array(
            array('from, to, subject, body', 'required'),
            array('from, to, subject, body ','safe'),
        );
    }

    public function attributeLabels() {
        return array(
            'from' => 'Sender',
            'to' => 'Reciver',
            'subject' => 'Title',
            'body' => 'Content',
        );
    }
}
