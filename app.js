const inputname = document.getElementById("input-name")
const inputtype = document.getElementById("input-type")
const inputvalue = document.getElementById("input-value")
const createdTaxes = document.getElementById("createdTaxes")
const inputPrice = document.getElementById("Price")
const taxform = document.getElementById("taxForm")
const CalculatedBreakdown = document.getElementById("CalculatedBreakdown")
const priceForm = document.getElementById ('priceForm')
const calculate = document.getElementById ('btnCalculate')
let precioIngresado = 0
const taxes = []

taxform.addEventListener('submit',(event)=> {
    event.preventDefault()
    const name = inputname.value
    const type = inputtype.value
    const value = inputvalue.value

    const tax ={
        name, type, value
    }
    taxes.push (tax)
    const tr = document.createElement('tr')
    tr.innerHTML=`
                <tr>
                <td id="tableElement"> ${tax.name}  </td>
                <td id="tableElement"> ${tax.type}  </td>
                <td id="tableElement"> ${tax.value} </td>
                </tr>
    `
    createdTaxes.append(tr)
})

priceForm.addEventListener ('submit', (event)=>{
    event.preventDefault()
    precioIngresado = Number(inputPrice.value)
    console.log (precioIngresado)
    priceForm.addEventListener ('submit', (event)=> {document.getElementById("btnCalculate").disabled = false})
})

calculate.addEventListener ('click', (event)=> {

    const inclusiveTaxes = taxes.filter ((el) => el.type.includes ('inclusivo'))
    const totalInclusive = inclusiveTaxes.reduce ((acc, el) => acc + Number(el.value), 0)  
    const exclusiveTaxes = taxes.filter ((el) => el.type.includes ('exclusivo'))
    const calculatedExclusive = exclusiveTaxes.map(({name, value})=>{
        return {name, value:(value *precioIngresado)/100}})
        
    let netValue = precioIngresado/(1+(totalInclusive/100))

    const calculatedInclusive = inclusiveTaxes.map(({name, value})=>{
        return {name, value:(value/100)* netValue}})



    const breakdown = document.createElement ('breakdown')
    const totalExclusive = (calculatedExclusive.reduce ((acc, el) => acc + el.value , 0)+precioIngresado)
    
    const printInc = []

    for (const elem of calculatedInclusive) {
        printInc.push (elem.name+" "+elem.value) 
    }   

    const printExc = []

    for (const elem of calculatedExclusive) {
        printExc.push (elem.name+" "+elem.value)  
    }

    breakdown.innerHTML=`
    <li> Precio neto:  ${netValue}</li>
    <li> ${printInc} </li>
    <li> ${printExc} </li>
    <li> Total:  ${totalExclusive} </li>
    `
    CalculatedBreakdown.append(breakdown)
    let submitted = "clicked"
    document.getElementById("btnCalculate").disabled = true
    
})    

inputPrice.addEventListener ('onchange', (event)=> {document.getElementById("btnCalculate").disabled = false})


// alert ("El deglose de precio es el siguiente: "+"Precio neto: "+ netValue +" "+ printInc + " "+printExc+" Total: "+ totalExclusive)
    



