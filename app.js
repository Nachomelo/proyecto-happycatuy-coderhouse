let userID = prompt("Ingrese su nombre de Usuario")

for (userID; userID.length<3;){
    alert("El nombre de Usuario ingresado no es valido")
    let userID = prompt ("Ingrese un nuevo nombre de Usuario que contenga mas caracteres")
    if (userID.length>3)
    break
}

let email = prompt ("Ingrese su direccion de email")
let email2 = prompt ("Verifique su direccion de email")
while (email!==email2) {
    alert("La direccion de email ingresada es incorrecta")
    email2 = prompt ("Verifique su direccion de email nuevamente")
}   
let keyWord = prompt ("Ingrese su palabra clave")

let verDatos = prompt ("Para ver los datos ingresados ingrese su palabra clave")
let contador=1
if (keyWord===verDatos) {
alert ("- Userid: "+userID+"- Email de usuario: "+email+ "- Palabra Clave: "+keyWord)
} else { 
    while (keyWord!==verDatos && contador<3){
    alert("La palabra clave ingresada es incorrecta, acceso a los datos denegado")
    contador++
    verDatos = prompt ("Para ver los datos ingresados ingrese su palabra clave")
    }   
if (contador===3){
    alert ("maximo de intentos alcanzado, acceso a los datos denegado")
    }
}




