



let counterFunc = 0

function tableLoad(){
    let tableList
    let table = document.querySelector(".client-tb")
    if(counterFunc === 0){
        clients.forEach((client, index)=>{
            tableList = `
                <tr style="width: 100%; font-size: 12px; display: grid; grid-template-columns: repeat(7, 1fr); border-bottom: 1px solid; padding: 3px; background-color: var(--purple-light);">
                    <td style="width: 300px;">
                        <a style="cursor: pointer; padding-right: 5px;"><span style="font-size: 12px; color: var(--white-color);" class="material-symbols-sharp">
                        open_in_new
                        </span></a>
                        ${client.nome}
                    </td>
                    <td style="width: 100px; text-align: start;">${client.plano}</td>
                    <td style="width: 100px;"> ${client.CPF}</td>
                    <td style="width: 80px;">${client.RG}</td>
                    <td style="width: 80px;">${client.Telefone}</td>
                    <td style="width: 80px;">${client.Bairro}</td>
                    <td style="width: 200px;">${client.Endereço}</td>
                `
            table.innerHTML += tableList
        })
    }
    counterFunc++
    console.log(counterFunc)
}



//declarando botoes do cadastro e modal

const btnNovoCad = document.querySelector(".novo-cadastro")
const modal = document.querySelector(".modal-overlay")
const btnSalvarCad = document.querySelector(".btn-salvar")
const btnCancelCad = document.querySelector(".btn-cancelar")

btnNovoCad.addEventListener("click", ()=>{
    modal.style.display = "grid"
})

btnCancelCad.addEventListener("click", ()=>{
    modal.style.display = "none"
})


//adicionando novo cadastro no array de cadastros

btnSalvarCad.addEventListener("click",newClientAdd)

function newClientAdd(){
    let newClient = {}

    newClient.nome = document.querySelector("#txt-nome").value
    newClient.CPF = document.querySelector("#txt-cpf").value
    newClient.RG = document.querySelector("#txt-rg").value
    newClient.Telefone = document.querySelector("#txt-tel").value
    newClient.Endereço = document.querySelector("#txt-endereco").value
    newClient.Numero = document.querySelector("#txt-nume").value
    newClient.Bairro = document.querySelector("#txt-bairro").value
    newClient.Sexualidade = document.getElementsByName("sex-radio").value
    newClient.plano = document.querySelector("#select-plano").value
    newClient.vencimento = document.querySelector("#select-venc").value

    clients.push(newClient)
    tableLoad()
}