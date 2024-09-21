<?php

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$text = $_POST['text'] ?? '';
$products = [];

if (isset($_POST['products'])) {
    foreach ($_POST['products'] as $productId => $product) {
        $products[$productId] = [
            'id' => $product['id'],
            'name' => $product['name'],
            'quantity' => $product['quantity'],
            'cost' => $product['cost']
        ];
    }
}

$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$text = htmlspecialchars($text);

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
$mail->Subject = 'Форма обратной связи - Хомякатор';

// Тело письма
$body = '<h1> Привет от хомяка!  </h1>';

if(trim(!empty($name))) {
    $body.='<p><strong>Имя:</strong> '.$name.'</p>';
}

if(trim(!empty($email))) {
    $body.= '<p><strong>Email:</strong> '.$email.'</p>';
}

if(trim(!empty($text))) {
    $body.= '<p><strong>Сообщение:</strong> '.$text.'</p>';
}

if (!empty($products)) {
    $body .= '<h2>Информация о заказе</h2>';
    foreach ($products as $productId => $product) {
        $body .= "<p><strong>ID:</strong> {$product['id']}<br>";
        $body .= "<strong>Название:</strong> {$product['name']}<br>";
        $body .= "<strong>Количество:</strong> " . ($product['quantity'] / 100) . " kg.<br>";
        $body .= "<strong>Цена:</strong> {$product['cost']} $</p>";
    }
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
exit;
?>