let clients = []

//setting data in localStorage for manipulating

if(localStorage.clients) {
    clients = JSON.parse(localStorage.getItem("clients"))
} else {
    localStorage.clients = JSON.stringify(clients)
}

const setDb = () => {
    localStorage.clients = JSON.stringify(clients)
}

const tableContasLoad = () =>{
    
    let tableList
    let table = document.querySelector(".receber-tb")

    table.innerHTML = ""
    clients.forEach( client => {

        const { vencimento, nome, plano } = client

        const diaFormatted = () => {
            if(vencimento <= 9) {
                return "0" + vencimento
            }else {
                return vencimento
            }
        }

        const mesFormatted = () => {
            if(calcVencimento() <= 9) {
                return "0" + calcVencimento()
            }else {
                return calcVencimento()
            }
        }


        const calcVencimento = () => {
            if ( vencimento <= diaAtual ) {
                return mes
            }else {
                return mes + 1
            }
        }

        //funcoes para analisar o vencimento e mudar a cor do texto 

        const situacao = () => {
            if ( vencimento <= diaAtual ) {
                return "A receber"
            }else {
                return "Vencido"
            }
        }

        const colorVenc = () => {
            if ( vencimento <= diaAtual ) {
                return `style="color:#f31818";`
            }else {
                return `style="color:#3ee60bb3";` 
            }
        }

        tableList = `
            <tr style="border-bottom: 1px solid var(--grey-color); background-color: var(--purple-light)">
                <td>${nome}</td>
                <td>${plano}</td>
                <td>${diaFormatted()}/${mesFormatted()}</td>
                <td ${colorVenc()}>${situacao()}</td>
            </tr>
            `
        table.innerHTML += tableList
        
    })
}

const cleanInputs = () => {
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
}



const formatNames = () => {
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

const formatCpf = () => {
    let cpfDefault = document.querySelector("#txt-cpf").value
    if (cpfDefault.length <= 10 || cpfDefault.length >= 12) {
        document.querySelector("#txt-cpf").value = ""
    } else {
        cpfFormatted = cpfDefault.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, "$1.$2.$3-$4")
        document.querySelector("#txt-cpf").value = cpfFormatted
    }
}

const formatRg = () => {
    let rgDefault = document.querySelector("#txt-rg").value
    if (rgDefault.length <= 8 || rgDefault.length >= 10) {
        document.querySelector("#txt-rg").value = ""
    } else {
        rgFormatted = rgDefault.replace(/(\d{2})?(\d{3})?(\d{3})?(\d{1})/, "$1.$2.$3-$4")
        document.querySelector("#txt-rg").value = rgFormatted
    } 
}

const formatTel = () => {
    let telDefault = document.querySelector("#txt-tel").value
    if (telDefault.length <= 10 || telDefault.length >= 12) {
        document.querySelector("#txt-tel").value = ""
    } else {
        telFormatted = telDefault.replace(/(\d{2})?(\d{5})?(\d{4})/, "($1) $2-$3")
        document.querySelector("#txt-tel").value = telFormatted

    }
}

const formatCep = () => {
    let cepDefault = document.querySelector("#txt-cep").value
    if (cepDefault.length <= 7 || cepDefault.length >= 9) {
        document.querySelector("#txt-cep").value = ""
    } else {
        cepFormatted = cepDefault.replace(/(\d{5})?(\d{3})/, "$1-$2")
        document.querySelector("#txt-cep").value = cepFormatted
    }
}


let date = new Date()
const diaAtual = date.getDate()
const mes = date.getUTCMonth()


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
    desativeRender()

})

cadastrosBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    activeBtn(cadastrosBtn)
    desativeBtn(dashboardBtn, osBtn, contasBtn)
    unSelect(dashContent, contasContent, ordensContent)
    cadastroContent.style.display = 'block'
    tableLoad()
    desativeRender()
})

contasBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    activeBtn(contasBtn)
    desativeBtn(dashboardBtn, cadastrosBtn, osBtn)
    unSelect(dashContent, cadastroContent, ordensContent)
    contasContent.style.display = 'grid'
    tableContasLoad()
    desativeRender()
})

osBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    activeBtn(osBtn)
    desativeBtn(dashboardBtn, cadastrosBtn, contasBtn)
    unSelect(dashContent, cadastroContent, contasContent)
    desativeRender()
})

const activeBtn = btn => {
    btn.classList.add("active")
}

const desativeBtn = (btn1, btn2, btn3) => {
    btn1.classList.remove("active")
    btn2.classList.remove("active")
    btn3.classList.remove("active")
}

//TODO: add the div to unselect on content2 e 3
const unSelect = (content1, content2, content3) => {
    content1.style.display = "none"
    content2.style.display = "none"
    content3.style.display = "none"
}


// search [FIX]
const search = document.querySelector("#search")
const render = document.querySelector("div.show-client")
const alertBox = document.querySelector("div.alert")

const renderInSearch = list => {
        desativeBtn(osBtn, dashboardBtn, cadastrosBtn)
        contasBtn.classList.remove("active")
        dashContent.style.display = 'none'
        clientFound.forEach((client, index)=>{
            list += `
                <div class='show-multiples'>
                    <div class='edit-client'>
                        <span data-change="${index}" class="material-symbols-sharp">
                            edit
                        </span>
                    </div>
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
    render.style.display = 'flex'
    render.innerHTML = list
}

const desativeRender = () => {
    alertBox.style.display = 'none'
    render.style.display = 'none'
}

const searchInKeyUp = event => {
    let searched = event.target.value

    clientFound = filterSearch(searched)

    let list = ' '

    if(searched.length<=0){
        setTimeout(()=>{
            desativeRender()
            activeBtn(dashboardBtn)
            desativeBtn(osBtn, cadastrosBtn, contasBtn)
            dashContent.classList.add("back-animation")
            dashContent.style.display = 'grid'
        }, 1000)
        alertBox.style.display = 'flex'
        alertBox.innerHTML = 'Digite o nome de um cliente para mostrar o cadastro no dashboard.'

        unSelect(dashContent, cadastroContent, contasContent)
    }else{
        unSelect(dashContent, cadastroContent, contasContent)
        renderInSearch(list)
    }
}

const newClientAdd = () =>{    
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

    const {CPF, RG, Telefone, CEP, cidade, Endereço, Numero, Bairro, plano, vencimento} = newClient

    if (CPF === "" || RG === "" || Telefone === "" || CEP === "" || cidade === "" || Endereço === "" || Numero === "" || Bairro === "" || plano === "" || vencimento === "") {
        return
    }
    cleanInputs()
    clients.push(newClient)
    tableLoad()
    setDb()
}

const deleteClient = target => {
    const indexToDelete = clients.map(client => client.nome)
    .indexOf(clients[target].nome)

    clients.splice(indexToDelete, 1)
    setDb()
    modalEdit.style.display = "none"
    cleanInputs()
    tableLoad()
}

const openModalEdit =  (clients, target) => {
    const {nome, CPF, RG, Telefone, CEP, cidade, Endereço, Numero, Bairro, plano, vencimento, Sexualidade} = clients[target]
    modalEdit.style.display = "grid"
    document.querySelector("#txt-e-nome").value = nome
    document.querySelector("#txt-e-cpf").value = CPF
    document.querySelector("#txt-e-rg").value = RG 
    document.querySelector("#txt-e-tel").value = Telefone
    document.querySelector("#txt-e-cep").value = CEP
    document.querySelector("#txt-e-cidade").value = cidade
    document.querySelector("#txt-e-endereco").value = Endereço
    document.querySelector("#txt-e-nume").value = Numero
    document.querySelector("#txt-e-bairro").value = Bairro
    document.querySelector('input[name=sex-e-radio]:checked').value = Sexualidade
    document.querySelector("#select-e-plano").value = plano
    document.querySelector("#select-e-venc").value = vencimento

}

let target
//using event.target.getAttribute to select the right client on the array clients so i can edit
window.addEventListener("dblclick", event => {
    target = event.target.getAttribute("data-id")

    if(target) {
        openModalEdit(clients,target)
    }
})

window.addEventListener("click", event => {
    target = event.target.getAttribute("data-change")

    if(target) {
        openModalEdit(clientFound, target)
    }
})


search.addEventListener('keyup', _.debounce(searchInKeyUp, 400))

const filterSearch = searched => {
    return clients.filter(( client =>{
        return client.nome.toLowerCase().includes(searched.toLowerCase())
    }))
}


const tableLoad = () => {
    let tableList = ""
    let table = document.querySelector(".client-tb")
    table.innerHTML = ""
    clients.forEach((client, index)=>{
        tableList += `
            <tr class="tr-padrao-2">
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
    })
    table.innerHTML += tableList
}



//declarando botoes do cadastro e modal

const btnNovoCad = document.querySelector(".novo-cadastro")
const modal = document.querySelector(".modal-overlay")
const modalEdit = document.querySelector(".modal-e-overlay")
const btnSalvarCad = document.querySelector(".btn-salvar")
const btnCancelCad = document.querySelector(".btn-cancelar")
const btnEditarCad = document.querySelector(".btn-editar")
const btnCancelEdCad = document.querySelector(".btn-cancelar-edit")
const btnExcluirCad = document.querySelector(".excluir-cadastro")

btnNovoCad.addEventListener("click", ()=>{
    modal.style.display = "grid"
})

btnCancelCad.addEventListener("click", ()=>{
    modal.style.display = "none"
    cleanInputs()
})

btnCancelEdCad.addEventListener("click", ()=>{
    modalEdit.style.display = "none"
    cleanInputs()
})

btnSalvarCad.addEventListener("click", newClientAdd)

btnExcluirCad.addEventListener("click", deleteClient)









