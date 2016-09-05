<?php 
	if (isset($_POST)) {
		# code...
			$emails = split(",", $_POST['recipient']);
			include_once 'mailer/PHPMailerAutoload.php';
			$mail = new PHPMailer;

			$mail->From = $_POST['sender'];
			$mail->FromName = $_POST['sender_name'];
			$mail->Subject = $_POST['subject'];
			$mail->Body = $_POST['message'];
			
			foreach($emails as $key => $email)
			{
			   $mail->AddCC($email);
			}
   
			if($mail->send()){
			    return true;
			    echo json_encode(array('success' => true));
			}else {
			    // return self::$mail->ErrorInfo;
			    echo json_encode(array('success' => false));
			}
	}
?>