let Usuario= prompt ('Buenos dias! por favor ingrese su nombre')
for (Usuario; Usuario.length<2;){
        alert("El nombre de Usuario ingresado no es valido")
        let Usuario = prompt ("Ingrese un nuevo nombre de Usuario que contenga mas caracteres")
        if (Usuario.length>2)
        break
    }
let precio= Number (prompt ('Para obtener el deglose de precio segun sus impuestos, ingrese el precio del Producto'))
let tipo = prompt ('Especifique si el monto facilitado es Antes o Despues de impuestos')
while (tipo.toLowerCase()!=="antes") {
        if (tipo.toLowerCase()==="despues")
        break
        alert("La informacion facilitada es incorrecta")
        tipo = prompt ("Especifique si el monto facilitado es Antes o Despues de impuestos")        
    }

let ivaPercent= Number (prompt ("Ingrese el valor porcentual del IVA en su Pais"))    

if (tipo.toLowerCase()==="antes"){
    IVA=IVAantes(precio);
   let precioFinal= precio + IVA;
   alert(Usuario +" su deglose de precio es el siguiente"+ " Costo sin impuestos: "+ precio + ", IVA : "+ IVA+ ", Total: "+ precioFinal)
    } else if (tipo.toLowerCase()==="despues"){
    IVA = IVADespues(precio);
    let precioAntes= precio - IVA;
    alert(Usuario +" su deglose de precio es el siguiente"+ " Costo sin impuestos: "+ precioAntes + ", IVA : "+ IVA+ ", Total: "+ precio)
   } else {
   prompt ('Especifique si el precio es Antes o Despues de impuestos')
}

function IVAantes(precio) {
    return (precio*ivaPercent)/100
}

function IVADespues(precio){
    let Before = (precio/(1+ivaPercent/100))
    return (precio - Before)
}