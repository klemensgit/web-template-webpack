<?php 
    require_once './class/DBqueries.php';
    require_once './utils/functions.php';
    require_once './utils/function_custom.php';

    include './vendor/sub_tpl_head.php';
?>


<body>
    <div class="container">
        <h1>Wellcome to</h1>
        <p>Webpack Web template</p>
        <div class="btn-standard">About</div>
        <?php echo showData(); ?>

        <div class="single-item">
            <div style="background-image:url('./images/1.jpg');"></div>
            <div style="background-image:url('./images/2.jpg');"></div>
            <div style="background-image:url('./images/3.jpg');"></div>
        </div>
    </div>  
    
    <div class="proba">
        <p>Proba</p>
        <div class="title">jj</div>
    </div>
</body>

</html>