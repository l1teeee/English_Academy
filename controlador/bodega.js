$(document).ready(function(){
    
   

    $(document).on('click','#cerrar',function(){
        $("#question").remove();
        $("#fondoM").remove();
        $("#error").remove();
        $("#success").remove();
        $("#edit").remove();
        $('.bg-gray-900').remove();
    });
});