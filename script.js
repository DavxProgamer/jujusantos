const API_KEY = "cf77314f-b190-483c-aac2-a6cf447f0c7a"

async function pagar(){

let valor = document.getElementById("valor").value

if(!valor){
alert("Digite um valor")
return
}

document.getElementById("loading").style.display="block"

try{

let resposta = await fetch("https://pix.evopay.cash/v1/pix",{

method:"POST",

headers:{
"Content-Type":"application/json",
"API-Key":API_KEY
},

body:JSON.stringify({
amount:parseFloat(valor)
})

})

let data = await resposta.json()

document.getElementById("loading").style.display="none"

document.getElementById("pagamento").style.display="block"

document.getElementById("qrcode").src =
"data:image/png;base64," + data.qrCodeBase64

document.getElementById("pixCode").value =
data.qrCodeText

document.getElementById("detalhes").innerHTML =

`
<p>ID: ${data.id}</p>
<p>Status: ${data.status}</p>
<p>Valor: R$ ${data.amount}</p>
`

}catch(e){

document.getElementById("loading").style.display="none"

alert("Erro ao gerar pagamento")

}

}

function copiarPix(){

let chave = document.getElementById("pixCode")

navigator.clipboard.writeText(chave.value)

alert("Pix copiado")

}
``