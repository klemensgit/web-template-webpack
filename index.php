<?php 
    require_once './class/DBqueries.php';
    require_once './utils/functions.php';
    require_once './utils/function_custom.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" type="text/css" href=""/>
	<link rel="stylesheet" type="text/css" href="" />

    <script type="text/javascript" src=""></script>
	<script type="text/javascript" src=""></script>

    <title>Template</title>
</head>
<body>
    <div class="container">
        <h1>Wellcome to</h1>
        <p>Web template</p>
        <div class="btn-standard">About</div>
        <?php echo showData(); ?>
    </div>  
</body>
</html>