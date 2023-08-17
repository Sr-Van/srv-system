let clients = [
    {
      nome: "Ana da Silva",
      CPF: "123.456.789-00",
      RG: "12.345.678-9",
      Telefone: "(11) 98765-4321",
      CEP: "12345-678",
      cidade: "Sao Paulo",
      Endereco: "Rua A, 123",
      Numero: 123,
      Bairro: "Centro",
      plano: "Plano A",
      vencimento: 1
    },
    {
      nome: "Joao Souza",
      CPF: "987.654.321-00",
      RG: "98.765.432-1",
      Telefone: "(21) 98765-4321",
      CEP: "54321-678",
      cidade: "Rio de Janeiro",
      Endereco: "Avenida B, 456",
      Numero: 456,
      Bairro: "Copacabana",
      plano: "Plano B",
      vencimento: 5
    },
    {
      nome: "Maria Oliveira",
      CPF: "111.222.333-44",
      RG: "11.222.333-4",
      Telefone: "(31) 98765-4321",
      CEP: "98765-432",
      cidade: "Belo Horizonte",
      Endereco: "Praça C, 789",
      Numero: 789,
      Bairro: "Savassi",
      plano: "Plano C",
      vencimento: 10
    },
    {
      nome: "Carlos Santos",
      CPF: "555.666.777-88",
      RG: "55.666.777-8",
      Telefone: "(41) 98765-4321",
      CEP: "76543-210",
      cidade: "Curitiba",
      Endereco: "Rua D, 987",
      Numero: 987,
      Bairro: "Batel",
      plano: "Plano D",
      vencimento: 15
    },
    {
      nome: "Laura Lima",
      CPF: "888.999.000-11",
      RG: "88.999.000-1",
      Telefone: "(51) 98765-4321",
      CEP: "87654-321",
      cidade: "Porto Alegre",
      Endereco: "Avenida E, 654",
      Numero: 654,
      Bairro: "Moinhos de Vento",
      plano: "Plano E",
      vencimento: 20
    },
    {
      nome: "Rafael Alves",
      CPF: "222.333.444-55",
      RG: "22.333.444-5",
      Telefone: "(61) 98765-4321",
      CEP: "23456-789",
      cidade: "Brasilia",
      Endereco: "Quadra F, 123",
      Numero: 123,
      Bairro: "Asa Sul",
      plano: "Plano F",
      vencimento: 25
    },
    {
      nome: "Isabel Castro",
      CPF: "444.555.666-77",
      RG: "44.555.666-7",
      Telefone: "(71) 98765-4321",
      CEP: "34567-890",
      cidade: "Salvador",
      Endereco: "Rua G, 987",
      Numero: 987,
      Bairro: "Barra",
      plano: "Plano G",
      vencimento: 1
    },
    {
      nome: "Antonio Pereira",
      CPF: "666.777.888-99",
      RG: "66.777.888-9",
      Telefone: "(81) 98765-4321",
      CEP: "45678-901",
      cidade: "Recife",
      Endereco: "Avenida H, 654",
      Numero: 654,
      Bairro: "Boa Viagem",
      plano: "Plano H",
      vencimento: 5
    },
    {
      nome: "Leticia Carvalho",
      CPF: "999.000.111-22",
      RG: "99.000.111-2",
      Telefone: "(85) 98765-4321",
      CEP: "56789-012",
      cidade: "Fortaleza",
      Endereco: "Rua I, 123",
      Numero: 123,
      Bairro: "Meireles",
      plano: "Plano I",
      vencimento: 10
    },
    {
      nome: "Gabriel Santos",
      CPF: "111.222.333-44",
      RG: "11.222.333-4",
      Telefone: "(92) 98765-4321",
      CEP: "67890-123",
      cidade: "Manaus",
      Endereco: "Avenida J, 987",
      Numero: 987,
      Bairro: "Centro",
      plano: "Plano J",
      vencimento: 15
    }
]

let orders = []
//setting data in localStorage for manipulating

if(localStorage.clients) {
    clients = JSON.parse(localStorage.getItem("clients"))
    orders = JSON.parse(localStorage.getItem("orders"))
} else {
    localStorage.clients = JSON.stringify(clients)
}

const setDb = () => {
    localStorage.clients = JSON.stringify(clients)
    localStorage.orders = JSON.stringify(orders)
}

let date = new Date()
const diaAtual = date.getDate()
const mes = date.getUTCMonth() + 1
const ano = date.getFullYear()


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
const tableContas = document.querySelector(".receber-tb")

const tableContasLoad = () =>{
    
    let tableList

    tableContas.innerHTML = ""
    clients.forEach( (client, index) => {
        const { vencimento, nome, plano, pagamento } = client
        const diaFormatted =  vencimento <= 9 ? "0" + vencimento : vencimento
        const calcVencimento =  vencimento <= diaAtual + 7 ? mes + 1  : mes 
        const mesFormatted = calcVencimento <= 9 ? "0" + calcVencimento : calcVencimento
        const colorVenc =  pagamento === "A Receber" ? `style="color:#f31818";` : `style="color:#3ee60bb3";`

        tableList = `
            <tr style="border-bottom: 1px solid var(--grey-color); background-color: var(--purple-light)">
                <td>${nome}</td>
                <td>${plano}</td>
                <td>${diaFormatted}/${mesFormatted}</td>
                <td ${colorVenc}>${pagamento}</td>
                <td><a class="confirm-pag" data-id="${index}">confirmar pag.</a></td>
            </tr>
            `
            tableContas.innerHTML += tableList
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

const confirmPayment = id => {
    clients[id].pagamento = "Recebido"
    setDb()
    tableContasLoad()
}

tableContas.addEventListener("click", e => {
    const idToConfirm = e.target.getAttribute("data-id")
    confirmPayment(idToConfirm)
})



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
    ordensContent.style.display = 'grid'
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

const renderInSearch = (client, index) => {

    desativeBtn(osBtn, dashboardBtn, cadastrosBtn)
    contasBtn.classList.remove("active")
    dashContent.style.display = 'none'

    const fragment = document.createDocumentFragment()
    const showMultiplesDiv = document.createElement("div")
    showMultiplesDiv.classList.add("show-multiples")
    const atributosDiv = document.createElement("div")
    const editClientDiv = document.createElement("div")
    editClientDiv.classList.add("edit-client")
    atributosDiv.classList.add("atributos")
    
    editClientDiv.innerHTML = `
        <span data-change="${index}" class="material-symbols-sharp">
            edit
        </span>
        `
    
    atributosDiv.innerHTML = `
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
    `

    showMultiplesDiv.append(editClientDiv)
    showMultiplesDiv.append(atributosDiv)
    fragment.append(showMultiplesDiv)
    
    render.append(fragment)
    render.style.display = 'flex'
}

const desativeRender = () => {
    alertBox.style.display = 'none'
    render.style.display = 'none'
}

const searchInKeyUp = event => {
    let searched = event.target.value

    let clientFound = filterSearch(searched)

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
        return
    }

    unSelect(dashContent, cadastroContent, contasContent)
    render.innerHTML = ""
    clientFound.forEach((client, index) => renderInSearch(client, index))
}

const addOrderNewClient = () => {
    const newOrderAdd = {}
    newOrderAdd.client = document.querySelector("#txt-nome").value
    newOrderAdd.type = 1
    newOrderAdd.id = orders.length + 1
    newOrderAdd.message = "Nova instalacao"
    newOrderAdd.situation = "Aberta"
    newOrderAdd.date = `${ano}-${mes}-${diaAtual}`

    orders.push(newOrderAdd)
    setOrdersData()
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
    newClient.pagamento = "A Receber"

    const {CPF, RG, Telefone, CEP, cidade, Endereço, Numero, Bairro, plano, vencimento} = newClient

    if (CPF === "" || RG === "" || Telefone === "" || CEP === "" || cidade === "" || Endereço === "" || Numero === "" || Bairro === "" || plano === "" || vencimento === "") {
        return
    }
    cleanInputs()
    clients.push(newClient)
    tableLoad()
    setDb()
    addOrderNewClient()
}

const findIndexToDelete = () => {
    return clients.map(client => client.nome)
    .indexOf(nomeParaIndex)
}

const deleteClient = () => {
    clients.splice(findIndexToDelete(), 1)
    setDb()
    modalEdit.style.display = "none"
    cleanInputs()
    tableLoad()
}

const openModalEdit =  (clients, target) => {
    const {nome, CPF, RG, Telefone, CEP, cidade, Endereço, Numero, Bairro, plano, vencimento, Sexualidade} = clients[target]

    nomeParaIndex = nome


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









