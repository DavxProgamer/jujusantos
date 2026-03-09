const token="sk_dusk_cd922724307da3235a675ac1f306165b21363e13527c9a68c19990447b790362"

async function gerarPix(){

let valor=document.getElementById("valor").value

if(!valor){
alert("Digite um valor")
return
}

document.getElementById("spinner").style.display="block"
document.getElementById("btnText").innerText="Gerando..."

try{

let resposta=await fetch("https://www.duskpay.com.br/api/v1/checkout",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+token
},

body:JSON.stringify({

amount:parseFloat(valor),
payer_name:"Cliente",
payer_document:"12345678901",
description:"Pagamento"

})

})

let data=await resposta.json()

document.getElementById("spinner").style.display="none"
document.getElementById("btnText").innerText="Gerar pagamento"

if(!data.success){
alert("Erro ao gerar pagamento")
return
}

document.getElementById("pagamento").style.display="block"

document.getElementById("qrcode").src=data.pix.qr_code_base64
document.getElementById("pixCode").value=data.pix.copy_paste

}catch(e){

document.getElementById("spinner").style.display="none"
document.getElementById("btnText").innerText="Gerar pagamento"

alert("Erro ao gerar pagamento")

}

}

function copiarPix(){

let campo=document.getElementById("pixCode")

navigator.clipboard.writeText(campo.value)

alert("Pix copiado")

}