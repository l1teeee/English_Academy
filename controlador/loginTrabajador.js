$(document).ready(function(){
    var estado = true;

    $("#fmrLogin").submit(function(e){
        e.preventDefault();
        estado = true;
        if($('#txtUsuario').val() == ""){
            var resultado = "";
            resultado += '<p id="mensaje">Campo usuario Vacio</p>';
            $('#errorUsuario').html(resultado);
            $('#txtUsuario').addClass("txtVacio");
            estado = false;
        }
        if($('#txtPassword').val() == ""){
            var resultado = "";
            resultado += '<p id="mensaje">Campo contraseña Vacio</p>';
            $('#errorContra').html(resultado);
            $('#txtPassword').addClass("txtVacio");
            estado = false;
        }
        if(estado == true){
            var usuario = $('#txtUsuario').val();
            var contra = $('#txtPassword').val();
            let action = "login";
            $.ajax({
                url : 'modelo/class.trabajadores.php',
                type : 'POST',
                data : {
                    action : action,
                    usuario : usuario,
                    contra : contra
                },
                success: function(respuesta){
                    var resultado = "";
                    var mensaje = JSON.parse(respuesta);
                    if(mensaje.status == true){
                        window.location.assign("dashboard.php");
                    }else{
                        resultado =  `<p> ${mensaje.msg} </p>`;
                        $('#errorLogin').html(resultado);
                    }
                },
                error : function(error){
                    console.log(error);
                }
            });
        }
    })
});