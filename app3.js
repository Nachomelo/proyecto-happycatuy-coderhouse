//for (let contador = 1; contador <=5; contador++) {
//    //codigo a ejecutar
//}

// i=i+2
//i+ =2
//
for (let i=0; i< 10; i +=2 ) {
    console.log(i)
}

for (let i=20; i>0; i--){
    console.log(i)
}

//nuevo ejemplo

let tabla = Number (prompt ("Ingrese el numero deseado"))

for (let i=1; i<=10; i++) {
    console.log("i*tabla")
}

//ejemplo de break

let numeroProhibido =66

for (let i= 0; i<=100; i++){
    console.log(i)
    if(i===nueroProhibido){
        console.log("NUMERO PROHIBIDO")
        break
    }
}

// ejemplo sentencia continue

for (let i= 0; i<=100; i++){
    console.log(i)
    if(i===nueroProhibido){        
        continue
    }
}

//ejemplo que muestra si los numeros que da el bucle son pares o impares

for (let i= 1; i<=100; i++){
    console.log(i % 2)
}

//WHILE
let pass=prompt("Ingrese la contraseña")

while (pass !=="Coder"){
    aler ("Acceso denegado, pruebe nuevamente")
    pass = prompt ("Ingrese la contraseña")
}
alert("Bienvenido!")

//ejemplo que permite un maximo de 3 intentos y sale del bucle

let pass=prompt("Ingrese la contraseña")
let contador = 1

while (pass !=="Coder"&& contador <3){
    aler ("Acceso denegado, pruebe nuevamente")
    contador++
    pass = prompt ("Ingrese la contraseña")
}

if (contador === 3) {
    alert ("Limite de ingresos fallidos excedido, Acceso Denegado, intente otro dia")
} else {
    alert("Bienvenido!")
}

//ejemplo de lo mismo sin negacion

for (let i = 1; i <= 3; i++) {
    let pass= prompt ("ingrese la contraseña")
        if(pass==="Coder") {
            alert("Bienvenido!")
            break
        } else if (i===3) {
            alert("Limite de ingresos fallidos, vuelva mañana")
        } else {
            alert ("Ingreso incorrecto, pruebe nuevamente")
        }
    }

//DO WHILE

let passWhile

do {
    passWhile = prompt ("Ingrese la contraseña")
} while (passWhile!==Coder)

alert("Bienvenido!")

//SWITCH

let banco = prompt ("Ingrese su banco")

switch(banco) { 
    case "Santander":
        interes = 1.75
        console.log("Interes 75%")
        break
    case "Macro":
        interes = 1.55
        console.log("Interes 55%")
    case "Provincia":
        interes=1.65
        console.log("Interes 65%")
    case "Galicia":
        interes =2.15
        console.log ("Interes 115%")
    default:
        alert ("no encontramos ese banco")
        break
}