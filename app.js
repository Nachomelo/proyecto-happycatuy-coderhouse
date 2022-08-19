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

let cicles = 0
let precioIngresado = 0
const taxes = []

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
                <button type="button" class="btnRemove" >X</button>
                </tr>
    `
    createdTaxes.append(tr)   
  
    taxform.reset()

    const taxesjson = JSON.stringify (taxes)
    localStorage.setItem("taxes",taxesjson)

    } else {
        inputname.classList.add ("failure")
        inputvalue.classList.add ("failure")
    }
    
// Remover Taxes 

    const removeTax = document.getElementsByClassName('btnRemove')
    for ( let i=0; i < removeTax.length; i++){
        let button = removeTax[i]
        button.addEventListener ('click', function(event){
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
    const liBreakdown = document.querySelectorAll ('.breakdownhtml')
    liBreakdown.forEach (breakdownhtml => {breakdownhtml.remove()})
})  

calculate.addEventListener ('click', (event)=> {
    const ciclo = taxes.filter ((el) => el.freq.includes ('ciclo'))
    const total = taxes.filter ((el) => el.freq.includes ('total'))
    
    // CALCULO CICLO ---------------------------------------------------------
    const inclusiveTaxesCiclo = ciclo.filter ((el) => el.type.includes ('inclusivo'))
    const totalInclusiveCiclo = inclusiveTaxesCiclo.reduce ((acc, el) => acc + Number(el.value), 0)  
    const exclusiveTaxesCiclo = ciclo.filter ((el) => el.type.includes ('exclusivo'))
    const calculatedExclusiveCiclo = exclusiveTaxesCiclo.map(({name, value})=>{
        return {name, value:(value *precioIngresado)/100}})
        
    let netValue = precioIngresado/(1+(totalInclusiveCiclo/100))

    const calculatedInclusiveCiclo = inclusiveTaxesCiclo.map(({name, value})=>{
        return {name, value:(value/100)* netValue}})
    
    let totalExclusiveCiclo = 0
    
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

    let preTotal = (totalExclusiveCiclo*cicles)
    const inclusiveTaxesTotal = total.filter ((el) => el.type.includes ('inclusivo'))
    const totalInclusiveTotal = inclusiveTaxesTotal.reduce ((acc, el) => acc + Number(el.value), 0)
    const exclusiveTaxesTotal = total.filter ((el) => el.type.includes ('exclusivo'))
    const calculatedExclusiveTotal = exclusiveTaxesTotal.map(({name, value})=>{
        return {name, value:(value *preTotal)/100}})
        
    let netValueTotal = preTotal/(1+(totalInclusiveTotal/100))

    const calculatedInclusiveTotal = inclusiveTaxesTotal.map(({name, value})=>{
        return {name, value:(value/100)* netValueTotal}})
        const totalExclusiveTotal = (calculatedExclusiveTotal.reduce ((acc, el) => acc + el.value , 0)+preTotal)
        

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