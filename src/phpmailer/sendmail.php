<?php

$name = $_POST['name'];
$email = $_POST['email'];
$text = $_POST['text'];

require 'includes/Exception.php';
require 'includes/PHPMailer.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->IsHTML(true);

//От кого письмо
$mail->setFrom('info@таймасов.рф', 'Portfolio');
// Кому отправить
$mail->addAddress('alexander@таймасов.рф');
// Тема письма
$mail->Subject = 'Форма обратной связи';

// Тело письма
$body = '<h1> Форма обратной связи </h1>';

if(trim(!empty($name))) {
    $body.='<p><strong>Имя:</strong> '.$name.'</p>';
}

if(trim(!empty($email))) {
    $body.= '<p><strong>Email:</strong> '.$email.'</p>';
}

if(trim(!empty($text))) {
    $body.= '<p><strong>Сообщение:</strong> '.$text.'</p>';
}


$mail->Body = $body;


if (!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);


?>