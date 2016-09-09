<?php
    require 'sb-admin2/Slim/Slim/Slim.php';
    \Slim\Slim::registerAutoloader();
    $app = new \Slim\Slim();
    $app->response->headers->set('Content-Type', 'application/json');

    $app->get('/product_usertype_code/:usertype/:code', function($usertype, $code) use ($app){
        include_once 'class/class.product.php';
        $product = new Product();
        $rows = $product->fetch($usertype, $code);
        echo json_encode($rows);
    });

    $app->run();
?>
