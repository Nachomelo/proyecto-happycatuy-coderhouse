let agregar="si"
const taxes = []

let precioIngresado= Number (prompt('Para obtener el deglose de precio segun sus impuestos, ingrese el precio del Producto'))
while (isNaN(precioIngresado)==true){
    alert ("La entrada ingresada no es valida")
    precioIngresado = Number (prompt ('Para obtener el deglose de precio segun sus impuestos, ingrese el valor numerico del precio del Producto'))               
}

while (agregar.toLowerCase()==="si") {    
let taxname = prompt ("Introduzca el nombre de su impuesto")
let typeP = prompt ("especifique si su impuesto es inclusivo o exclusivo");
    while (typeP.toLowerCase()!=="inclusivo"){
        if (typeP.toLowerCase()==="exclusivo") break 
        alert ("La entrada ingresada no es valida")
        typeP = prompt ("especifique si su impuesto es inclusivo o exclusivo")               
    }
let valueP = Number (prompt ("especifique el valor porcentual de dicho impuesto"))
    while (isNaN(valueP)==true){
    alert ("La entrada ingresada no es valida")
    valueP = Number (prompt ('especifique el valor porcentual de dicho impuesto'))               
}
    agregar= prompt ("desea continuar agregando impuestos? si/no")
    taxes.push ({name:taxname,type:typeP,value:valueP})
};

const inclusiveTaxes = taxes.filter ((el) => el.type.includes ('inclusivo'))
const totalInclusive = inclusiveTaxes.reduce ((acc, el) => acc + el.value, 0)
const exclusiveTaxes = taxes.filter ((el) => el.type.includes ('exclusivo'))
const calculatedExclusive = exclusiveTaxes.map((el) => precioIngresado * (el.value/100))
let netValue = precioIngresado/(1+(totalInclusive/100))
inclusiveTaxes.forEach((el)=> { el.value = (el.value/100)* netValue })
exclusiveTaxes.forEach((el)=> { el.value = (el.value/100)* precioIngresado })

const totalExclusive = (exclusiveTaxes.reduce ((acc, el) => acc + el.value , 0)+precioIngresado)


console.log (totalInclusive)

const printInc = []

for (const valores of inclusiveTaxes) {
    printInc.push (valores.name+" "+valores.value)  
}

const printExc = []

for (const elem of exclusiveTaxes) {
    printInc.push (elem.name+" "+elem.value)  
}


alert ("El deglose de precio es el siguiente: "+"Precio neto: "+ netValue +" "+ printInc + " "+printExc+" Total: "+ totalExclusive)


function total (value1, value2) {return value1 + value2}

