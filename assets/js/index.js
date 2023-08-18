let clients = []

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

const planosObj = {
    1: "50,00",
    2: "60,00",
    3: "70,00",
    4: "100,00"
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

const modalConfirmPayment = document.querySelector(".modal-confirm-payment-overlay")
const addPaymentBtn = document.querySelector(".btn-confirm")
const denyPaymentBtn = document.querySelector(".btn-deny")

const tableContasLoad = () =>{
    
    let tableList

    tableContas.innerHTML = ""
    clients.forEach( (client, index) => {
        const { vencimento, nome, plano, pagamento } = client
        getPaymentSituation(pagamento)
        const diaFormatted =  vencimento <= 9 ? "0" + vencimento : vencimento
        const mesFormatted = paymentMonth <= 9 ? "0" + paymentMonth : paymentMonth
        const colorVenc =  getColorPayment(pagamento) === 'A receber' ? `style="color:#f31818";` : `style="color:#3ee60bb3";`

        tableList = `
            <tr style="border-bottom: 1px solid var(--grey-color); background-color: var(--purple-light); max-height: 30px; overflow: hidden;">
                <td>${nome}</td>
                <td>${plano}</td>
                <td>${diaFormatted}/${mesFormatted}</td>
                <td ${colorVenc}>${paymentSituation}</td>
                <td><a class="confirm-pag" data-id="${index}">confirmar pag.</a></td>
            </tr>
            `
            tableContas.innerHTML += tableList
    })
}

const getColorPayment = pagamentos => {
    const findActualMonth = pagamentos.find(pagamento => pagamento.month == mes)
    if(findActualMonth) {
        return findActualMonth.situation
    }
    return ""
}

const getPaymentSituation = pagamentos => {
    const fisrFindPayment = pagamentos
    .find(pagamento => pagamento.situation == "A receber")
    const { month, situation } = fisrFindPayment
    paymentMonth = month
    paymentSituation = situation

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

let idToConfirm

tableContas.addEventListener("click", e => {
    e.preventDefault()
    idToConfirm = e.target.getAttribute("data-id")
    if(idToConfirm === null) {
        return
    }
    modalConfirmPayment.style.display = "grid"
})

denyPaymentBtn.addEventListener("click", event => {
    event.preventDefault()
    modalConfirmPayment.style.display = "none"
})
addPaymentBtn.addEventListener("click", event => {
    event.preventDefault()
    confirmPayment(idToConfirm)
    modalConfirmPayment.style.display = "none"
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



const desativeRender = () => {
    alertBox.style.display = 'none'
    render.style.display = 'none'
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
    renderTable()
    countOrders()
}

const generatePayment = (planoValue, vencimento) => {
    const payment = [];
    for (i=mes; i < 12; i++) {
        const objPayment = { }
        objPayment.month = vencimento <= diaAtual + 7 ? i + 1 : i
        objPayment.value = planosObj[planoValue]
        
        objPayment.situation = "A receber"
        payment.push(objPayment)
    }
    return payment
}

const getTextSelectPlano = () => {
    const selecPlano = document.querySelector("#select-plano")
    const optionPlano = selecPlano.children[selecPlano.selectedIndex]
    return optionPlano.textContent
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
    newClient.plano = getTextSelectPlano()
    newClient.vencimento = document.querySelector("#select-venc").value
    
    const {CPF, RG, Telefone, CEP, cidade, Endereço, Numero, Bairro, plano, vencimento} = newClient
    const planoValue = document.querySelector("#select-plano").value
    newClient.pagamento = generatePayment(planoValue, vencimento)

    if (CPF === "" || RG === "" || Telefone === "" || CEP === "" || cidade === "" || Endereço === "" || Numero === "" || Bairro === "" || plano === "" || vencimento === "") {
        return
    }
    clients.push(newClient)
    tableLoad()
    setDb()
    addOrderNewClient()
    cleanInputs()
    modal.style.display = "none"
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









