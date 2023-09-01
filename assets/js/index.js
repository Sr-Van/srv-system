let clients = []

let orders = []

let allTimeRegisters = []


const setDb = () => {
    localStorage.clients = JSON.stringify(clients)
    localStorage.orders = JSON.stringify(orders)
    localStorage.allTimeRegisters = JSON.stringify(allTimeRegisters)
}

//setting data in localStorage for manipulating
if(localStorage.clients) {
    clients = JSON.parse(localStorage.getItem("clients"))
    orders = JSON.parse(localStorage.getItem("orders"))
    allTimeRegisters = JSON.parse(localStorage.getItem("allTimeRegisters"))
} else {
    setDb()
}

const planosObj = {
    1: "50,00",
    2: "60,00",
    3: "70,00",
    4: "100,00"
}

if(allTimeRegisters.length == 0) {
    alert("Para carregar dados no sistema crie um novo cadastro no menu cadastros")
}

let date = new Date()
const diaAtual = date.getDate()
const mes = date.getUTCMonth() + 1
const ano = date.getFullYear()



// search [FIX]
const search = document.querySelector("#search")
const render = document.querySelector(".show-client")
const alertBox = document.querySelector(".alert")


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
const registerTable = document.querySelector(".client-tb")
const activeUsers = document.querySelector(".active-clients")
const allUsers = document.querySelector(".unactive-clients")
const usersActivePercentage = document.querySelector(".atice-percentage")
const usersActivePercentageCircle = document.querySelector(".users-percentage") 

const styleCircle =  getComputedStyle(usersActivePercentageCircle)
const strokeInCircle = styleCircle.strokeWidth

const strokeDashToCircle = strokeInCircle == "4px" ? 120 : 235




const btnNovoCad = document.querySelector(".novo-cadastro")
const modal = document.querySelector(".modal-overlay")
const modalEdit = document.querySelector(".modal-e-overlay")
const btnSalvarCad = document.querySelector(".btn-salvar")
const btnCancelCad = document.querySelector(".btn-cancelar")
const btnEditarCad = document.querySelector(".btn-editar")
const btnCancelEdCad = document.querySelector(".btn-cancelar-edit")
const btnExcluirCad = document.querySelector(".excluir-cadastro")

const renderClientOnRegister = (client, index) => {

    const { nome, plano, CPF, RG, Telefone, Bairro, Endereço } = client

    let registerTableList = ""
    registerTableList += `
            <tr class="tr-padrao-2">
                <td style="width: 14.37rem; cursor: pointer; overflow: hidden;" data-id="${index}">
                    ${nome}
                </td>
                <td>${plano}</td>
                <td> ${CPF}</td>
                <td>${RG}</td>
                <td>${Telefone}</td>
                <td>${Bairro}</td>
                <td>${Endereço}</td>
            `
            
    registerTable.innerHTML += registerTableList
}

const registerLoad = () => {
    registerTable.innerHTML = ""
    clients.forEach((client, index)=> renderClientOnRegister(client, index))
}

const loadUsersDashboard = () => {
    allUsers.innerHTML = allTimeRegisters.length
    activeUsers.innerHTML = clients.length

    const percentage = Math.trunc(
        ( clients.length * 100 ) / allTimeRegisters.length)
    usersActivePercentage.textContent = `${percentage}%`


    if (isNaN(percentage)) {
        usersActivePercentage.textContent = `0%`
    }

    if (percentage <= 51) {
        usersActivePercentageCircle.style.stroke = "#f31818";
    } else {
        usersActivePercentageCircle.style.stroke = "#038b79";
    }

    const percentageCircle = Math.trunc(
        Math.abs(((percentage - 100) / 100) * strokeDashToCircle))


    usersActivePercentageCircle.style.strokeDashoffset = percentageCircle;
}

loadUsersDashboard()

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

const formatToFirstLetterUppercase = nomeDefault => {
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
    if (rgDefault.length <= 7 || rgDefault.length >= 10) {
        document.querySelector("#txt-rg").value = ""
        return 
    } 
    if (rgDefault.length == 8) {
        rgFormatted = rgDefault.replace(/(\d{2})?(\d{3})?(\d{3})/, "$1.$2.$3")
        document.querySelector("#txt-rg").value = rgFormatted
        return
    }
    rgFormatted = rgDefault.replace(/(\d{2})?(\d{3})?(\d{3})?(\d{1})/, "$1.$2.$3-$4")
    document.querySelector("#txt-rg").value = rgFormatted
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

let idToConfirm
let monthToConfirm

dashboardBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    activeBtn(dashboardBtn)
    desativeBtn(osBtn, cadastrosBtn, contasBtn)
    dashContent.style.display = 'grid' //mostrando o conteudo da div dashboard-content apenas quando o botao dashboard estiver ativo
    unSelect(cadastroContent, contasContent, ordensContent, render)
})

cadastrosBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    activeBtn(cadastrosBtn)
    desativeBtn(dashboardBtn, osBtn, contasBtn)
    unSelect(dashContent, contasContent, ordensContent, render)
    cadastroContent.style.display = 'block'
    registerLoad()
})

contasBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    activeBtn(contasBtn)
    desativeBtn(dashboardBtn, cadastrosBtn, osBtn)
    unSelect(dashContent, cadastroContent, ordensContent, render)
    contasContent.style.display = 'grid'
    tableContasLoad()
})

osBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    activeBtn(osBtn)
    desativeBtn(dashboardBtn, cadastrosBtn, contasBtn)
    unSelect(dashContent, cadastroContent, contasContent, render)
    ordensContent.style.display = 'grid'
})

const activeBtn = btn => {
    btn.classList.add("active")
}

const desativeBtn = (...btn) => {
    btn.forEach(btn => btn.classList.remove("active"));
}

//TODO: add the div to unselect on content2 e 3
const unSelect = (...content) => {
    content.forEach(content => content.style.display = "none")
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
    const valuePerDay = parseInt(planosObj[planoValue]) / 30
    const valuePerDayFixed = parseFloat(valuePerDay.toFixed(2))

    let counter = 0

    for (i=mes; i < 12; i++) {
        const objPayment = { }
        
        objPayment.month = vencimento <= diaAtual + 7 ? i + 1 : i

        if(counter == 0) {
            const parsePlano = parseFloat(planosObj[planoValue])

            const daysSignal = vencimento - diaAtual 
            
            const daysOff = Math.abs(vencimento - diaAtual)

            const totalValueDiff = valuePerDayFixed * daysOff

            const diff = daysSignal < 0 ? parsePlano - totalValueDiff : parsePlano + totalValueDiff

            const fixedDiff = diff.toFixed(2)

            objPayment.value = fixedDiff
            counter++
        }else {
            objPayment.value = planosObj[planoValue]  
        }
        objPayment.situation = "A receber"
        payment.push(objPayment)
    }
    return payment
}

const getTextSelectPlano = select => {
    const optionPlano = select.children[select.selectedIndex]
    return optionPlano.textContent
}
const putTextSelectPlano = (select, plano) => {
    const optionPlano = select.children[select.selectedIndex]
    optionPlano.textContent = plano
}

const newClientAdd = () =>{    
    let newClient = {}
    let newClientRegister = {}

    newClientRegister.nome = nameFormatted
    newClientRegister.id = Math.trunc(Math.random() * 1000)

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

    const selecPlano = document.querySelector("#select-plano")

    newClient.plano = getTextSelectPlano(selecPlano)
    newClient.vencimento = document.querySelector("#select-venc").value
    
    const {CPF, RG, Telefone, CEP, cidade, Endereço, Numero, Bairro, plano, vencimento} = newClient
    const planoValue = document.querySelector("#select-plano").value
    newClient.pagamento = generatePayment(planoValue, vencimento)

    if (CPF === "" || RG === "" || Telefone === "" || CEP === "" || cidade === "" || Endereço === "" || Numero === "" || Bairro === "" || plano === "" || vencimento === "") {
        return
    }
    allTimeRegisters.push(newClientRegister)
    clients.push(newClient)
    registerLoad()
    setDb()
    addOrderNewClient()
    cleanInputs()
    loadUsersDashboard()
    modal.style.display = "none"
}

const findIndexToDelete = () => {
    return clients
        .map(client => client.nome)
        .indexOf(nomeParaIndex)
}

const deleteClient = () => {
    clients.splice(findIndexToDelete(), 1)
    setDb()
    modalEdit.style.display = "none"
    cleanInputs()
    registerLoad()
    loadUsersDashboard()
}

const editClient = () => {
    const editedClient = clients[findIndexToDelete()]

    editedClient.nome = document.querySelector("#txt-e-nome").value
    editedClient.CPF = document.querySelector("#txt-e-cpf").value
    editedClient.RG = document.querySelector("#txt-e-rg").value
    editedClient.Telefone = document.querySelector("#txt-e-tel").value
    editedClient.CEP = document.querySelector("#txt-e-cep").value
    editedClient.cidade = document.querySelector("#txt-e-cidade").value
    editedClient.Endereço = document.querySelector("#txt-e-endereco").value
    editedClient.Numero = document.querySelector("#txt-e-nume").value
    editedClient.Bairro = document.querySelector("#txt-e-bairro").value
    editedClient.Sexualidade = document.querySelector('input[name=sex-e-radio]:checked').value

    const selecPlano = document.querySelector("#select-e-plano")
    editedClient.plano = getTextSelectPlano(selecPlano)

    setDb()
    cleanInputs()
    registerLoad()
    modalEdit.style.display = "none"
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
    const select = document.querySelector("#select-e-plano")
    putTextSelectPlano(select, plano)
    document.querySelector("#select-e-venc").value = vencimento

}

let target

registerTable.addEventListener("click", event => {
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

btnSalvarCad.addEventListener("click", () => {
    newClientAdd()
    showAlert("Novo cadastro salvo")
})

btnExcluirCad.addEventListener("click", () => {
    deleteClient()
    showAlert("Cadastro excluido")
}
)

btnEditarCad.addEventListener("click", () => {
    editClient()
    showAlert("Cadastro editado com sucesso")
} 
)









