const inputname = document.getElementById("input-name")
const inputtype = document.getElementById("input-type")
const inputvalue = document.getElementById("input-value")
const inputfreq = document.getElementById ("input-freq")
const createdTaxes = document.getElementById("createdTaxes")
const inputPrice = document.getElementById("Price")
const taxform = document.getElementById("taxForm")
const CalculatedBreakdown = document.getElementById("CalculatedBreakdown")
const priceForm = document.getElementById ('priceForm')
const calculate = document.getElementById ('btnCalculate')
const create = document.getElementById ('btnCreate')
const inputCicle = document.getElementById ('cicles')
const convert = document.getElementById('btnConvert')
const inputFrom = document.getElementById('currencyFrom')
const inputTo = document.getElementById('currencyTo')
const convertedBreakdown = document.getElementById ('convertedBreakdown')

let cicles = 0
let precioIngresado = 0
const taxes = []

let calculatedInclusiveCiclo = []
let calculatedExclusiveCiclo = []
let calculatedInclusiveTotal = []
let calculatedExclusiveTotal = []
let netValue = 0
let totalExclusiveCiclo = 0
let preTotal =0
let totalExclusiveTotal=0


let remove = 0

// Creacion de Taxes 
taxform.addEventListener('submit',(event)=> {
    event.preventDefault()
    
    const name = inputname.value
    const type = inputtype.value
    const value = inputvalue.value
    const freq = inputfreq.value

    const tax ={
        name, type, value, freq
    }
    if (tax.value>=0.1){
        taxes.push (tax)
    const tr = document.createElement('tr')
    tr.innerHTML=`
                <tr>
                <td id="tableElement"> ${tax.name}  </td>
                <td id="tableElement"> ${tax.type}  </td>
                <td id="tableElement"> ${tax.value} </td>
                <td id="tableElement"> ${tax.freq} </td>
                <button type="button" class="btnRemove btn btn-outline-danger btn-sm" >X</button>
                </tr>
    `
    createdTaxes.append(tr)   
  
    taxform.reset()

    const taxesjson = JSON.stringify (taxes)
    localStorage.setItem("taxes",taxesjson)
        inputname.classList.remove ("failure")
        inputvalue.classList.remove ("failure")
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Falta informacion para crear el impuesto!',
            footer: '<a href="">Es necesario ingresar un nombre y el valor porcentual del mismo para crearlo</a>',
            confirmButtonColor: "#635959",
            background: 'white'
          })
          const buttonOK = document.getElementsByClassName('swal2-confirm')
          console.log (buttonOK)
          buttonOK.classList.remove("swal2-styled")
          buttonOK.classList.add("btn btn-secondary")

        inputname.classList.add ("failure")
        inputvalue.classList.add ("failure")
    }
    
// Remover Taxes 

    const removeTax = document.getElementsByClassName('btnRemove')
    for ( let i=0; i < removeTax.length; i++){
        let buttonT = removeTax[i]
        buttonT.addEventListener ('click', function(event){
            let buttonClicked = event.target
            buttonClicked.parentElement.remove()
            removeTaxf(i)            
        })
    }

});


///CALCULO -------------------------------------------------

priceForm.addEventListener ('submit', (event)=>{
    event.preventDefault()
    priceForm.addEventListener ('submit', (event)=> {document.getElementById("btnCalculate").disabled = false})
    precioIngresado = Number(inputPrice.value)
    cicles = Number(inputCicle.value)
    if (cicles<1) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La cantidad deciclos tiene que ser mayor o igual a 1!',
            footer: '<a href="">Corrije esta informacion y presiona cargar nuevamente</a>',
            confirmButtonColor: "#635959",
            background: 'white'
          })
    }
    const liBreakdown = document.querySelectorAll ('.breakdownhtml')
    liBreakdown.forEach (breakdownhtml => {breakdownhtml.remove()})
    
})  

calculate.addEventListener ('click', (event)=> {
    if (precioIngresado<=1){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Falta informacion para realizar el calculo!',
            footer: '<a href="">Es necesario cargar el precio ingresado utilizando la opcion "Cargar" para luego poder realizar el calculo</a>',
            confirmButtonColor: "#635959",
            background: 'white'
          })
    } 

    const ciclo = taxes.filter ((el) => el.freq.includes ('ciclo'))
    const total = taxes.filter ((el) => el.freq.includes ('total'))
    
    // CALCULO CICLO ---------------------------------------------------------
    const inclusiveTaxesCiclo = ciclo.filter ((el) => el.type.includes ('inclusivo'))
    const totalInclusiveCiclo = inclusiveTaxesCiclo.reduce ((acc, el) => acc + Number(el.value), 0)  
    const exclusiveTaxesCiclo = ciclo.filter ((el) => el.type.includes ('exclusivo'))
    calculatedExclusiveCiclo = exclusiveTaxesCiclo.map(({name, value})=>{
        return {name, value:(value *precioIngresado)/100}})
        
    netValue = precioIngresado/(1+(totalInclusiveCiclo/100))

    calculatedInclusiveCiclo = inclusiveTaxesCiclo.map(({name, value})=>{
        return {name, value:(value/100)* netValue}})


    if (exclusiveTaxesCiclo.length>=1){totalExclusiveCiclo=(calculatedExclusiveCiclo.reduce ((acc, el) => acc + el.value , 0)+precioIngresado)} 
    else {totalExclusiveCiclo = (precioIngresado*cicles)}

    const printIncCiclo = []

    for (const elem of calculatedInclusiveCiclo) {
        printIncCiclo.push (elem.name+" "+elem.value) 
    }   

    const printExcCiclo = []

    for (const elem of calculatedExclusiveCiclo) {
        printExcCiclo.push (elem.name+" "+elem.value)  


    // CALCULO TOTAL

    preTotal = (totalExclusiveCiclo*cicles)
    const inclusiveTaxesTotal = total.filter ((el) => el.type.includes ('inclusivo'))
    const totalInclusiveTotal = inclusiveTaxesTotal.reduce ((acc, el) => acc + Number(el.value), 0)
    const exclusiveTaxesTotal = total.filter ((el) => el.type.includes ('exclusivo'))
    calculatedExclusiveTotal = exclusiveTaxesTotal.map(({name, value})=>{
        return {name, value:(value *preTotal)/100}})
        
    let netValueTotal = preTotal/(1+(totalInclusiveTotal/100))

    calculatedInclusiveTotal = inclusiveTaxesTotal.map(({name, value})=>{
        return {name, value:(value/100)* netValueTotal}})
        totalExclusiveTotal = (calculatedExclusiveTotal.reduce ((acc, el) => acc + el.value , 0)+preTotal)
        

    const printIncTotal = []

    for (const elem of calculatedInclusiveTotal) {
        printIncTotal.push (elem.name+" "+elem.value) 
    }   

    const printExcTotal = []

    for (const elem of calculatedExclusiveTotal) {
        printExcTotal.push (elem.name+" "+elem.value)  
    }

    // Mostrar el breakdown //       
    
    if (total.length>= 1) {

        const breakdownCiclo = document.createElement ('breakdownCiclo')

        breakdownCiclo.innerHTML=`
        <li class="breakdownhtml"> Precio neto:  ${netValue}</li>
        <li class="breakdownhtml"> ${printIncCiclo} </li>
        <li class="breakdownhtml"> ${printExcCiclo} </li>
        <li class="breakdownhtml"> Total por Periodo:  ${totalExclusiveCiclo} </li>
        <li class="breakdownhtml"> Subtotal:  ${preTotal}</li>
        `
        CalculatedBreakdown.append(breakdownCiclo)
    
        const breakdownTotal = document.createElement ('breakdownTotal')
    
        breakdownTotal.innerHTML=`
        <li class="breakdownhtml"> ${printIncTotal} </li>
        <li class="breakdownhtml"> ${printExcTotal} </li>
        <li class="breakdownhtml"> Total:  ${totalExclusiveTotal} </li>
        `
        CalculatedBreakdown.append(breakdownTotal)

    } else {
    const breakdownCiclo = document.createElement ('breakdownCiclo')

    breakdownCiclo.innerHTML=`
    <li class="breakdownhtml"> Precio neto:  ${netValue}</li>
    <li class="breakdownhtml"> ${printIncCiclo} </li>
    <li class="breakdownhtml"> ${printExcCiclo} </li>
    <li class="breakdownhtml"> Total por Periodo:  ${totalExclusiveCiclo} </li>
    <li class="breakdownhtml"> Total  ${preTotal}</li>
    `
    CalculatedBreakdown.append(breakdownCiclo)

    }
    priceForm.addEventListener ('click', (event)=> {document.getElementById("btnCalculate").disabled = true})
}
})

function removeTaxf (element) {
    taxes.splice(element, 1)
}

// Selectores de Currencies

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a96170e83fmshbfbbf9af873ef48p128326jsn75e418a11aaf',
		'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
	}
};

fetch('https://currency-exchange.p.rapidapi.com/listquotes', options)
	.then(res => res.json())
	.then(res => {

        let select = document.getElementById('currencyFrom')
        let select2 = document.getElementById('currencyTo')

        console.log(res)
            for(let i = 0; i < res.length; i++) {
        let opt = res[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.append(el); 
    }    
    })
	.catch(err => console.error(err));

    fetch('https://currency-exchange.p.rapidapi.com/listquotes', options)
	.then(res2 => res2.json())
	.then(res2 => {

        let select2 = document.getElementById('currencyTo')

        console.log(res2)
            for(let i = 0; i < res2.length; i++) {
        let opt = res2[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select2.append(el); 
    }    
    })
	.catch(err => console.error(err));


// Convert //

convert.addEventListener ('click',(event)=> {
    event.preventDefault()
    const from = inputFrom.value
    const to = inputTo.value
    const options = {
        	method: 'GET',
        	headers: {
        		'X-RapidAPI-Key': 'a96170e83fmshbfbbf9af873ef48p128326jsn75e418a11aaf',
        		'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        	}
        };
    fetch(`https://currency-exchange.p.rapidapi.com/exchange?from=${from}&to=${to}&q=1.0`, options)
	.then(res => res.json())
	.then(res => {
        const convPrecio= (precioIngresado*res)

    // CONVERTIR VALORES CICLO 

        const convertedInclusiveCiclo = calculatedInclusiveCiclo.map(({name, value})=>{
            return {name, value:(value*res)}})  
            
            const printConvIncCiclo = []

            for (const elem of convertedInclusiveCiclo) {
                printConvIncCiclo.push (elem.name+" "+elem.value) 
            }       
        
            
        const convertedExclusiveCiclo = calculatedExclusiveCiclo.map(({name, value})=>{
            return {name, value:(value*res)}})       
        
            const printConvExcCiclo = []

            for (const elem of convertedExclusiveCiclo) {
                printConvExcCiclo.push (elem.name+" "+elem.value) 
            }   
     
    // CONVERTIR VALORES TOTAL

        const convertedExclusiveTotal = calculatedExclusiveTotal.map(({name, value})=>{
        return {name, value:(value *res)}})
        const printConvExcTotal = []
        for (const elem of convertedExclusiveTotal) {
            printConvExcTotal.push (elem.name+" "+elem.value) 
        }   

        const convertedInclusiveTotal = calculatedInclusiveTotal.map(({name, value})=>{
            return {name, value:(value *res)}})
            const printConvIncTotal = []
            for (const elem of convertedInclusiveTotal) {
                printConvIncTotal.push (elem.name+" "+elem.value) 
            } 
            console.log (printConvIncTotal)  
    // Mostrar el breakdown convertido//  

    const breakdownCicloConv = document.createElement ('breakdownCicloConv')

        breakdownCicloConv.innerHTML=`
        <li class="breakdownhtml"> Precio neto:  ${(netValue*res)}</li>
        <li class="breakdownhtml"> ${printConvIncCiclo} </li>
        <li class="breakdownhtml"> ${printConvExcCiclo} </li>
        <li class="breakdownhtml"> Total por Periodo:  ${(totalExclusiveCiclo*res)} </li>
        <li class="breakdownhtml"> Subtotal:  ${preTotal}</li>
        `
        convertedBreakdown.append(breakdownCicloConv)

        const breakdownTotalConv = document.createElement ('breakdownTotalConv')
    
        breakdownTotalConv.innerHTML=`
        <li class="breakdownhtml"> ${printConvIncTotal} </li>
        <li class="breakdownhtml"> ${printConvExcTotal} </li>
        <li class="breakdownhtml"> Total:  ${(totalExclusiveTotal*res)} </li>
        `
        convertedBreakdown.append(breakdownTotalConv)

    })
	.catch(err => console.error(err));


})
