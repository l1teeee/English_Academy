function validarLogin(){
    var correo = document.getElementById("txtUsuario").value;
    var contra = document.getElementById("txtPassword").value;
    var regex = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@cdb\.edu\.sv$/;

    if(correo =="" || correo == null && contra =="" || contra == null){
        alert("Favor complete todos los campos");
        return false;
    }else if(correo == null || correo == ""){
        alert("Favor complete el correo");
        return false;
    } else if(!regex.test(correo)){
        alert("Favor revisar formato de correo");
        return false;
    } else if(contra == "" || contra == null){
        alert("Favor complete la contraseña");
        return false;
    }
}