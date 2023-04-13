$(document).ready(function() 
{   
   $(".productcolor").click(function(){
      debugger;
        //alert("The paragraph was clicked.");
        
            var currentElement = $(this).attr('data-hex');
            $("#product-shape").css("fill",currentElement)
             
      });
});