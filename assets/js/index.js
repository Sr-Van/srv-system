let clients = []

//setting data in localStorage for manipulating

if(localStorage.clients) {
    clients = JSON.parse(localStorage.getItem("clients"))
} else {
    localStorage.clients = JSON.stringify(clients)
}

let setDb = () => {
    localStorage.clients = JSON.stringify(clients)
}

let date = new Date()
let diaAtual = date.getDate()
let mes = date.getUTCMonth()


/* Declarando botoes do sidebar */
const dashboardBtn = document.querySelector('.dashboard-btn')
const cadastrosBtn = document.querySelector('.cadastros-btn')
const contasBtn = document.querySelector('.contas-btn')
const osBtn = document.querySelector('.os-btn')

/* Declarando conteudos */
const dashContent = document.querySelector('.dashboard-content')
const cadastroContent = document.querySelector(".cadastros")
const contasContent = document.querySelector(".contas")
const ordensContent = document.querySelector(".ordens")

dashboardBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    activeBtn(dashboardBtn)
    desativeBtn(osBtn, cadastrosBtn, contasBtn)
    dashContent.style.display = 'grid' //mostrando o conteudo da div dashboard-content apenas quando o botao dashboard estiver ativo
    unSelect(cadastroContent, contasContent, ordensContent)
})

cadastrosBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    activeBtn(cadastrosBtn)
    desativeBtn(dashboardBtn, osBtn, contasBtn)
    unSelect(dashContent, contasContent, ordensContent)
    cadastroContent.style.display = 'block'
    tableLoad()
})

contasBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    activeBtn(contasBtn)
    desativeBtn(dashboardBtn, cadastrosBtn, osBtn)
    unSelect(dashContent, cadastroContent, ordensContent)
    contasContent.style.display = 'grid'
    tableContasLoad()
})

osBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    activeBtn(osBtn)
    desativeBtn(dashboardBtn, cadastrosBtn, contasBtn)
    unSelect(dashContent, cadastroContent, contasContent)
})

function activeBtn(btn){
    btn.classList.add("active")
}

function desativeBtn(btn1, btn2, btn3){
    btn1.classList.remove("active")
    btn2.classList.remove("active")
    btn3.classList.remove("active")
}

//TODO: add the div to unselect on content2 e 3
function unSelect(content1, content2, content3){
    content1.style.display = "none"
    content2.style.display = "none"
    content3.style.display = "none"
}


// search [FIX]
const search = document.querySelector("#search")
const render = document.querySelector("div.show-client")
const alertBox = document.querySelector("div.alert")

function searchInKeyUp(event){
    let searched = event.target.value

    clientFound = filterSearch(searched)

    let list = ' '

    if(searched.length<=0){
        setTimeout(()=>{
            alertBox.style.display = 'none'
            render.style.display = 'none'
            dashboardBtn.classList.add("active")
            dashContent.classList.add("back-animation")
            dashContent.style.display = 'grid'
        }, 1000)
        alertBox.style.display = 'flex'
        alertBox.innerHTML = 'Digite o nome de um cliente para mostrar o cadastro no dashboard.'

        dashContent.style.display = 'none'
    }else{

        //desativando os botoes da sidebar
        osBtn.classList.remove("active")
        dashboardBtn.classList.remove("active")
        cadastrosBtn.classList.remove("active")
        contasBtn.classList.remove("active")
        dashContent.style.display = 'none'
        clientFound.forEach((client, index)=>{
            list += `
                <div class='show-multiples'>
                    <div class='edit-client'><span data-change="${index}" class="material-symbols-sharp">
                    edit
                    </span></div>
                    <div class='atributos'>
                        <div class='client-atrib'>
                            <h3>Cliente: </h3>
                            <p> ${client.nome}</p>
                        </div>
                        <div class='client-atrib'>
                            <h3>CPF/CNPJ: </h3>
                            <p> ${client.CPF}</p>
                        </div>
                        <div class='client-atrib'>
                            <h3>RG/IE: </h3>
                            <p> ${client.RG}</p>
                        </div>
                        <div class='client-atrib'>
                            <h3>Telefone: </h3>
                            <p> ${client.Telefone}</p>
                        </div>
                        <div class='client-atrib'>
                            <h3>Plano: </h3>
                            <p> ${client.plano}</p>
                        </div>
                    </div>
                </div>
            `
        })
    }
    render.style.display = 'flex'
    render.innerHTML = list
}

let target
//using event.target.getAttribute to select the right client on the array clients so i can edit
window.addEventListener("dblclick", (event) => {
    target = event.target.getAttribute("data-id")

    if(target) {
        modalEdit.style.display = "grid"
        document.querySelector("#txt-e-nome").value = clients[target].nome
        document.querySelector("#txt-e-cpf").value = clients[target].CPF
        document.querySelector("#txt-e-rg").value = clients[target].RG 
        document.querySelector("#txt-e-tel").value = clients[target].Telefone
        document.querySelector("#txt-e-cep").value = clients[target].CEP
        document.querySelector("#txt-e-cidade").value = clients[target].cidade
        document.querySelector("#txt-e-endereco").value = clients[target].Endereço
        document.querySelector("#txt-e-nume").value = clients[target].Numero
        document.querySelector("#txt-e-bairro").value = clients[target].Bairro
        document.querySelector('input[name=sex-e-radio]:checked').value = clients[target].Sexualidade
        document.querySelector("#select-e-plano").value = clients[target].plano
        document.querySelector("#select-e-venc").value = clients[target].vencimento

    }
})

window.addEventListener("click", (event) => {
    target = event.target.getAttribute("data-change")

    if(target) {
        modalEdit.style.display = "grid"
        document.querySelector("#txt-e-nome").value = clientFound[target].nome
        document.querySelector("#txt-e-cpf").value = clientFound[target].CPF
        document.querySelector("#txt-e-rg").value = clientFound[target].RG 
        document.querySelector("#txt-e-tel").value = clientFound[target].Telefone
        document.querySelector("#txt-e-cep").value = clientFound[target].CEP
        document.querySelector("#txt-e-cidade").value = clientFound[target].cidade
        document.querySelector("#txt-e-endereco").value = clientFound[target].Endereço
        document.querySelector("#txt-e-nume").value = clientFound[target].Numero
        document.querySelector("#txt-e-bairro").value = clientFound[target].Bairro
        document.querySelector('input[name=sex-e-radio]:checked').value = clientFound[target].Sexualidade
        document.querySelector("#select-e-plano").value = clientFound[target].plano
        document.querySelector("#select-e-venc").value = clientFound[target].vencimento

    }
})


search.addEventListener('keyup', _.debounce(searchInKeyUp, 400))

function filterSearch(searched){
    return clients.filter(((client, index) =>{
        return client.nome.toLowerCase().includes(searched.toLowerCase())
    }))
}

// deleted the cadastros.js because i was having some modules problemas, still working here

function tableLoad(){
    let tableList
    let table = document.querySelector(".client-tb")
    table.innerHTML = ""
    clients.forEach((client, index)=>{
        tableList = `
            <tr style="width: 100%; font-size: 12px; display: grid; grid-template-columns: repeat(7, 1fr); border-bottom: 1px solid; padding: 3px; background-color: var(--purple-light); gap:10px">
                <td style="width: 250px; cursor: pointer;" data-id="${index}">
                    ${client.nome}
                </td>
                <td>${client.plano}</td>
                <td> ${client.CPF}</td>
                <td>${client.RG}</td>
                <td>${client.Telefone}</td>
                <td>${client.Bairro}</td>
                <td>${client.Endereço}</td>
            `
        table.innerHTML += tableList
    })
}



//declarando botoes do cadastro e modal

const btnNovoCad = document.querySelector(".novo-cadastro")
const modal = document.querySelector(".modal-overlay")
const modalEdit = document.querySelector(".modal-e-overlay")
const btnSalvarCad = document.querySelector(".btn-salvar")
const btnCancelCad = document.querySelector(".btn-cancelar")
const btnEditarCad = document.querySelector(".btn-editar")
const btnCancelEdCad = document.querySelector(".btn-cancelar-edit")

btnNovoCad.addEventListener("click", ()=>{
    modal.style.display = "grid"
})

btnCancelCad.addEventListener("click", ()=>{
    modal.style.display = "none"

    document.querySelector("#txt-nome").value = ""
    document.querySelector("#txt-cpf").value = ""
    document.querySelector("#txt-rg").value = ""
    document.querySelector("#txt-tel").value = ""
    document.querySelector("#txt-cep").value = ""
    document.querySelector("#txt-cidade").value = ""
    document.querySelector("#txt-endereco").value = ""
    document.querySelector("#txt-nume").value = ""
    document.querySelector("#txt-bairro").value = ""
    document.getElementsByName("sex-radio").value = ""
    document.querySelector("#select-plano").value = ""
    document.querySelector("#select-venc").value = ""
})


//adicionando novo cadastro no array de cadastros

btnSalvarCad.addEventListener("click", newClientAdd)
btnEditarCad.addEventListener("click", editClient)

function editClient () {
    console.log(target)
}


function newClientAdd(){
        
        let newClient = {}
    
        newClient.nome = nameFormatted
        newClient.CPF = cpfFormatted
        newClient.RG = rgFormatted
        newClient.Telefone = telFormatted
        newClient.CEP = cepFormatted
        newClient.cidade = document.querySelector("#txt-cidade").value
        newClient.Endereço = document.querySelector("#txt-endereco").value
        newClient.Numero = document.querySelector("#txt-nume").value
        newClient.Bairro = document.querySelector("#txt-bairro").value
        newClient.Sexualidade = document.querySelector('input[name=sex-radio]:checked').value
        newClient.plano = document.querySelector("#select-plano").value
        newClient.vencimento = document.querySelector("#select-venc").value
    
        let {nome, CPF, RG, Telefone, CEP, cidade, Endereço, Numero, Bairro, plano, vencimento} = newClient
    
        if (CPF === "" || RG === "" || Telefone === "" || CEP === "" || cidade === "" || Endereço === "" || Numero === "" || Bairro === "" || plano === "" || vencimento === "") {
            console.log("erro!")
        }else {
            //Cleaning the input value after getting the value from the client
            document.querySelector("#txt-nome").value = ""
            document.querySelector("#txt-cpf").value = ""
            document.querySelector("#txt-rg").value = ""
            document.querySelector("#txt-tel").value = ""
            document.querySelector("#txt-cep").value = ""
            document.querySelector("#txt-cidade").value = ""
            document.querySelector("#txt-endereco").value = ""
            document.querySelector("#txt-nume").value = ""
            document.querySelector("#txt-bairro").value = ""
            document.getElementsByName("sex-radio").value = ""
            document.querySelector("#select-plano").value = ""
            document.querySelector("#select-venc").value = ""  
            clients.push(newClient)
            tableLoad()
            setDb()
        }
}

function formatNames () {
    nomeDefault = document.querySelector("#txt-nome").value
    let completeName = nomeDefault.toString()
    let eachName = completeName.split(" ")
    nameFormatted = ""
    eachName.forEach((named) => {
        format = named[0].toUpperCase() + named.substring(1)
        nameFormatted += format + " "
    })
    document.querySelector("#txt-nome").value = nameFormatted
}

function formatCpf() {
    let cpfDefault = document.querySelector("#txt-cpf").value
    if (cpfDefault.length <= 10 || cpfDefault.length >= 12) {
        document.querySelector("#txt-cpf").value = ""
    } else {
        cpfFormatted = cpfDefault.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, "$1.$2.$3-$4")
        document.querySelector("#txt-cpf").value = cpfFormatted
    }
}

function formatRg() {
    let rgDefault = document.querySelector("#txt-rg").value
    if (rgDefault.length <= 8 || rgDefault.length >= 10) {
        document.querySelector("#txt-rg").value = ""
    } else {
        rgFormatted = rgDefault.replace(/(\d{2})?(\d{3})?(\d{3})?(\d{1})/, "$1.$2.$3-$4")
        document.querySelector("#txt-rg").value = rgFormatted
    } 
}

function formatTel() {
    let telDefault = document.querySelector("#txt-tel").value
    if (telDefault.length <= 10 || telDefault.length >= 12) {
        document.querySelector("#txt-tel").value = ""
    } else {
        telFormatted = telDefault.replace(/(\d{2})?(\d{5})?(\d{4})/, "($1) $2-$3")
        document.querySelector("#txt-tel").value = telFormatted

    }
}

function formatCep() {
    let cepDefault = document.querySelector("#txt-cep").value
    if (cepDefault.length <= 7 || cepDefault.length >= 9) {
        document.querySelector("#txt-cep").value = ""
    } else {
        cepFormatted = cepDefault.replace(/(\d{5})?(\d{3})/, "$1-$2")
        document.querySelector("#txt-cep").value = cepFormatted
    }
}



function tableContasLoad(){
    
    let tableList
    let table = document.querySelector(".receber-tb")

    table.innerHTML = ""
    clients.forEach((client)=>{

        let diaVenc = client.vencimento

        let diaFormatted = () => {
            if(diaVenc <= 9) {
                return "0" + diaVenc
            }else {
                return diaVenc
            }
        }

        let mesFormatted = () => {
            if(calcVencimento() <= 9) {
                return "0" + calcVencimento()
            }else {
                return calcVencimento()
            }
        }


        let calcVencimento = () => {
            if ( client.vencimento <= diaAtual ) {
                return mes
            }else {
                return mes + 1
            }
        }

        //funcoes para analisar o vencimento e mudar a cor do texto 

        let vencimento = () => {
            if ( client.vencimento <= diaAtual ) {
                return "A receber"
            }else {
                return "Vencido"
            }
        }

        let colorVenc = () => {
            if ( client.vencimento <= diaAtual ) {
                return `style="color:#f31818";`
            }else {
                return `style="color:#3ee60bb3";` 
            }
        }

        tableList = `
            <tr style="border-bottom: 1px solid var(--grey-color);">
                <td>${client.nome}</td>
                <td>${client.plano}</td>
                <td>${diaFormatted()}/${mesFormatted()}</td>
                <td ${colorVenc()}>${vencimento()}</td>
            </tr>
            `
        table.innerHTML += tableList
        
    })
}



