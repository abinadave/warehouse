 <?php session_start(); if (!isset($_SESSION['uid'])) { ?>
<!DOCTYPE html>
<html>
<head>
    <title>Ezjones WMS</title>
    <script src="js/libs/pubnub/pubnub-3.7.1.min.js"></script>
    <script data-main="js/main" src="js/require-jquery.js"></script>
    <link rel="stylesheet" type="text/css" href="bootstrap/flat-ui/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="bootstrap/flat-ui/css/flat-ui.css">
    <link rel="stylesheet" type="text/css" href="bootstrap/flat-ui/css/icon-font.css">
    <link rel="stylesheet" type="text/css" href="bootstrap/flat-ui/css/style.css">
</head>
<body id="the-body">

    <div class="page-wrapper" id="navigation">
    
        <div id="page"></div>

            <footer class="footer-2 bg-midnight-blue">
                <div class="container">
                    <nav class="pull-left">
                        <ul>  
                            <li class="active">
                                <a href="#home"></a>
                            </li>
                        </ul>
                    </nav>
                    
                    <div class="social-btns pull-right">
                        <a href="#"><div class="fui-vimeo"></div><div class="fui-vimeo"></div></a>
                        <a href="#"><div class="fui-facebook"></div><div class="fui-facebook"></div></a>
                        <a href="#"><div class="fui-twitter"></div><div class="fui-twitter"></div></a>
                    </div>

                    <div class="additional-links">
                       
                    </div>

                </div>

            </footer>

</div>

<script src="sb-admin2/js/bootstrap.min.js"></script>
<script src="bootstrap/flat-ui/js/modernizr.custom.js"></script>
<script type="bootstrap/flat-ui/js/startup-kit.js"></script>
<script src="js/script.js"></script>

</body> 
</html>

<?php }else { ?>

<!DOCTYPE html>
<html>
<head>
    <title>Welcome</title>
    <script data-main="js/main" src="js/require-jquery.js"></script>
    <link href="sb-admin2/css/bootstrap.min.css" rel="stylesheet">
    <link href="sb-admin2/css/plugins/metisMenu/metisMenu.min.css" rel="stylesheet">
    <link href="sb-admin2/css/sb-admin-2.css" rel="stylesheet">
    <link href="sb-admin2/font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" type="text/css" href="js/libs/choosenJS/chosen.min.css">
    <link rel="stylesheet" type="text/css" href="bootstrap/dist/css/style.css">
    <link rel="stylesheet" type="text/css" href="js/libs/jquery-ui/jquery-ui.min.css">
    <link rel="stylesheet" type="text/css" href="bootstrap/dist/css/sticky-footer.css">
    <script src="sb-admin2/js/bootstrap.min.js"></script>
    <script src="sb-admin2/js/plugins/metisMenu/metisMenu.min.js"></script>
    <script src="sb-admin2/js/sb-admin-2.js"></script>
    <script src="bootstrap/js/transition.js"></script>  
    <script src="bootstrap/js/modal.js"></script>
    <script src="js/script.js"></script>
</head>
<body>

 <div id="navigation">

        <!-- Navigation -->
        <nav id="nav-bar-here" class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0" >
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand text-danger">Ezjones Constructions, <span class="text-primary" id="branch-name"></span></a>
                <p class="navbar-text">Signed in as <span id="nav-users-name"><span class="fa fa-spinner fa-spin"></span></span> </p>
            </div>
   
            <img id="image-user" src="images/user.jpeg" alt="" class="img-thumbnail" style="position: absolute; width: 60px; height: 50px; padding: 4px; cursor: pointer">

            <ul class="nav navbar-top-links navbar-right">
                
                <!-- /.dropdown -->
                       <?php 
                            if ($_SESSION['usertype'] == 1) {
                                ?>
                                    <li>
                                       <a href="#userlogs"><span class="glyphicon glyphicon-time"></span> &nbsp;&nbsp;Userlogs</a></li>   
                                    </li>
                                     <!-- <li><a href="#backupDatabase"><i class="glyphicon glyphicon-cloud-download"></i></a></li> -->
                                <?php
                            }   
                        ?>
                <!-- /.dropdown -->

                <li class="dropdown" id="bell-notifications">
                
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-bell fa-fw"></i><i class="fa fa-caret-down"></i>
                    </a>
                    
                    <ul class="dropdown-menu dropdown-alerts" id="list-of-notifications" style="overflow: auto; height: 400px">
                        <li>
                            <a>
                                <div class="text-center">
                                   <i class="fa fa-circle-o-notch fa-spin fa-1x text-info"></i>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <!-- /.dropdown-alerts -->
                </li>
        
                <li><a style="cursor: pointer" id="send-mail"><i class="glyphicon glyphicon-envelope"></i></a>        
                <li><a href="#logout" id="logout"><span class="glyphicon glyphicon-off"></span></a></li>
               
                <!-- /.dropdown -->

            </ul>
            <!-- /.navbar-top-links -->

            <div class="navbar-default sidebar" role="navigation">

                <div class="sidebar-nav navbar-collapse">
                
                    <ul class="nav" id="side-menu">
                        
                        <li id="manage-navigation">
                            <li>
                               <a class="li-side-menu" href="#dashboard" id="dashboard"><i class="fa fa-dashboard fa-fw"></i>&nbsp;&nbsp;&nbsp;  Dashboard</a>
                           </li>
                           <li>
                               <a class="li-side-menu" href="#products" id="products"><i class="glyphicon glyphicon-briefcase"></i>&nbsp;&nbsp;&nbsp;  Items</a>
                           </li>
                           
                           <li>
                               <a class="li-side-menu" href="#availableTools" id="tool-list"><i class="fa fa-cogs"></i>&nbsp;&nbsp;&nbsp;  Equipments</a>
                           </li>
                           
                           <li>
                               <a class="li-side-menu" href="#ViewWarehouse"><i class="fa fa-building"></i>&nbsp;&nbsp;&nbsp; Warehouse</a>
                           </li>

                                <?php 
                                    if ($_SESSION['usertype'] == 1) {
                                        ?>
                                            <li>
                                                <a href="#Accounts" id="managers"><i class="fa fa-user fa-fw"></i>&nbsp;&nbsp;&nbsp;  Managers</a>
                                            </li>
                                        <?php
                                    }
                                ?>
                               
                            <!-- /.nav-second-level -->
                        </li>
                        <li>
                            <!-- <a style="cursor: pointer" href="#bulletinBoard"><i class="fa fa-dashboard fa-fw"></i>&nbsp;&nbsp;&nbsp;  Bulletin</a> -->
                        </li>
                        <li>
                            <a id="chat-li" style="cursor: pointer"><i class="fa fa-weixin"></i>&nbsp;&nbsp;&nbsp;  Chat&nbsp;&nbsp;&nbsp;<span class="badge" id="chat-room-occupancy">0</span></a>
                        </li>
                        
                         
                        <li>
                            <a style="cursor: pointer" id="supplier-li"><i class="fa fa-truck"></i>&nbsp;&nbsp;&nbsp;  Suppliers</a>
                            <a style="cursor: pointer" id="unit-li"><i class="fa fa-sort-amount-asc"></i>&nbsp;&nbsp;&nbsp;  Units</a>
                        </li>

                        <li>
                            <a id="setting-li" style="cursor: pointer"><i class="fa fa-wrench"></i>&nbsp;&nbsp;&nbsp;  Settings</a>
                        </li>
 
                        
                    </ul>
                </div>
               
            </div>
          
        </nav>

        <!-- Page Content -->
 </div>      

        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12" id="main">
                    <h1><small class="text-primary">Please wait..</small></h1>
                </div>
                <div id="placeholder"></div>
            </div>
        </div>

<footer class="footer">
    <div class="container">
        <p class="text-muted pull-left" id="current-time" style="margin-left: -100px">Loading ...</p>
    </div>
</footer>
</body>
</html>

<?php } ?>
