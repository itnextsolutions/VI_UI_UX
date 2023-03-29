$(document).ready(function() 
{   
   $(".productcolor").click(function(){
        //alert("The paragraph was clicked.");
        
            var currentElement = $(this).attr('data-hex');
            $("#product-shape").css("fill",currentElement)
             
      });
});