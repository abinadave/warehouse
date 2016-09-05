<?php
session_start(); 
	/**
	*  sending to gmail..
	*/
	include_once 'mailer/PHPMailerAutoload.php';
	class MailerClass
	{
		private static $mail;

		function __construct()
		{
			self::$mail = new PHPMailer();
		}

		public static function send($emails, $subject, $message){

			self::$mail = new PHPMailer;

			self::$mail->From = 'christiandaveabina@gmail.com';
			self::$mail->FromName = 'christian dave abina';
			self::$mail->Subject = 'Thesis docs';
			self::$mail->Body = 'This is the message';
			
			foreach($emails as $key => $email)
			{
			   self::$mail->AddCC($email);
			}

			$dir = self::getAttachedFiles();
                        
			if (count($dir) >= 3) {
				foreach ($dir as $key => $value) {
					$thisdir = '../../db/temp/'. $_SESSION['uid'] . '/' . $value;
					if (is_file($thisdir)) {
						self::$mail->AddAttachment($thisdir);
					}
				}
			}

			if(self::$mail->send()){
			    return true;
			}else {
			    return self::$mail->ErrorInfo;
			}

		}

		public static function getAttachedFiles(){
			$dir = '../../db/temp/' . $_SESSION['uid'];
			$lists = scandir($dir);
			return $lists;
		}



	}
?>