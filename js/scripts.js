
import "../sass/style.scss";

$(document).ready(function(){
    // enter code here

    function getAjaxRespons(){
        $.ajax({
            url: "./utils/ajaxrespons.php?func=getData&limit=2",
            type: "GET",
            success: function(data){
                console.log(data);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown); 
			}
        });
    }
    getAjaxRespons();


    function getAjaxRespons1(){
        $.ajax({
            url: "./utils/ajaxrespons.php",
            type: "POST",
            data: {
                'func': 'getData',
                'limit': 1,
            },
            success: function(data){
                console.log(data);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown); 
			}
        });
    }
    getAjaxRespons1();

    function getAll(){
        return "bla1";
    }

    $('.btn-standard').on('click', function(){
        console.log("wii");
    });

    $('.single-item').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1
    });
});