<?php 
    require_once './class/DBqueries.php';
    require_once './utils/functions.php';
    require_once './utils/function_custom.php';

    include './vendor/sub_tpl_head.php';
?>


<body>
    <div class="container">
        <h1>Wellcome to</h1>
        <p>Web template</p>
        <div class="btn-standard">About</div>
        <?php echo showData(); ?>
    </div>  
</body>

</html>