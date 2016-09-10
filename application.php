<?php
    require 'sb-admin2/Slim/Slim/Slim.php';
    \Slim\Slim::registerAutoloader();
    $app = new \Slim\Slim();
    $app->response->headers->set('Content-Type', 'application/json');

    $app->get('/product_usertype_code/:usertype/:code', function($usertype, $code) use ($app){
        include_once 'class/class.product.php';
        $product = new Product();
        $rows = array();
        if ($usertype == 3) {
            $rows = $product->fetch($usertype, $code);
        }else {
            $rows = $product->fetchAll();
        }
        echo json_encode($rows);
        
    });

    $app->run();
?>
