
if(localStorage.orders) {
    orders = JSON.parse(localStorage.getItem("orders"))
} else {
    localStorage.orders = JSON.stringify(orders)
}

const setOrdersData = () => {
    localStorage.orders = JSON.stringify(orders)
}

const typesOfOrders = {
    1: "instalacao",
    2: "Troca de roteador",
    3: "lentidao ao jogar",
    4: "lentidao ao navegar",
    5: "Remocao de equipamento",
    6: "Velocidade nao corresponde ao plano",
    7: "Troca de plano",
    8: "Problema externo",
    9: "Feedback do cliente"
}

const finalOrderMessages = {
    1: "Finalizada",
    2: "Necessita de equipe extra",
    3: "Cliente nao estava presente",
    4: "Nao foi possivel realizar o atendimento",
    5: "Passada ao setor administrativo"
}

const table = document.querySelector(`[data-js="table-os"]`)
const selectSituacao = document.querySelector("#select-situacao")
const selectMotivo = document.querySelector("#motivo-select")
const buttonNewOrder = document.querySelector(".btn-nova-os")
const buttonSaveOrder = document.querySelector(".btn-salvar-ordem")
const buttonChangeOrder = document.querySelector(".btn-change-os")
const buttonCancelOrder = document.querySelector(".btn-cancelar-ordem")
const buttonEndOrder = document.querySelector(".btn-finalizar-ordem")
const modalOsOverlay = document.querySelector(".modal-os-overlay")
const messageOutput = document.querySelector(".output")
const progressDoneCount = document.querySelector(".status1")
const progressTodoCount = document.querySelector(".status2")
const messageCounterOnScreen = document.querySelector(".count-messages")
const messageCounterToDoOnDiv = document.querySelector(".p-todo-os")
const messageCounterDoneOnDiv = document.querySelector(".p-done-os")
const messageCounterToDoOndash = document.querySelector(".p-orders-dash-todo")
const messageCounterdoneOndash = document.querySelector(".p-orders-dash-done")
const osPercengateDashboard = document.querySelector(".os-percengate")
const osPercengateDashboardCircle = document.querySelector(".os-svg")

const GetSelectClient = document.querySelector("#cliente-select")
const GetSelectSituation = document.querySelector("#select-situacao")

const getTypeOfOrders = (order, index) => {
    const { type, client, date, situation } = order
    const typeToText = typesOfOrders[type]
    const tr = document.createElement("tr")

    tr.classList.add("tr-padrao-os")
    tr.innerHTML = `
        <td style="cursor: pointer;">
            <span data-id="${index}" class="material-symbols-sharp edit-order">
                edit
            </span>
            
        </td>
        <td>${typeToText}</td>
        <td>${client}</td>
        <td>${date}</td>
        <td>${situation}</td>
    `
    table.prepend(tr)
}

const renderTable = () => {
    table.innerHTML = ""
    orders.forEach((order, index) => getTypeOfOrders(order, index))
}

renderTable()

const ordersPercentage = ordersOpened => {
    const percentage = (ordersOpened * 100) / orders.length
    const percentageFormat = Math.trunc(percentage)
    osPercengateDashboard.textContent = `${percentageFormat}%`

    if (isNaN(percentage)) {
        osPercengateDashboard.textContent = `0%`
    }

    if(percentage >= 51){
        osPercengateDashboardCircle.style.stroke = "#f31818"
    } else {
        osPercengateDashboardCircle.style.stroke = "#038b79";
    }
    //CALCULO PORCENTAGEM    
    const percentageCircle = Math.trunc(Math.abs((percentageFormat - 100) / 100 * 222))
    osPercengateDashboardCircle.style.strokeDashoffset = percentageCircle
}


const countOrders = () => {
    const arrayOrdersOpened = orders
        .filter(order => order
        .situation === "Aberta")
    const ordersOpened = arrayOrdersOpened.length
    const ordersNotOpened = orders.length - ordersOpened
    messageCounterOnScreen.textContent = ordersOpened
    messageCounterToDoOnDiv.textContent = ordersOpened
    messageCounterToDoOndash.textContent = ordersOpened
    messageCounterDoneOnDiv.textContent = ordersNotOpened
    messageCounterdoneOndash.textContent = ordersNotOpened
    progressDoneCount.style.height = `${ordersNotOpened}px`
    progressTodoCount.style.height = `${ordersOpened}px`
    ordersPercentage(ordersOpened)
}

countOrders()

const renderNamesOnSelect = name => {
    const option = document.createElement("option")
    option.textContent = name
    GetSelectClient.append(option)
}

const createDefaultOption = (select, text) => {
    select.innerHTML = ""
    const option = document.createElement("option")
    option.textContent = text
    select.append(option)
}

const clientNameOnSelect = () => {
    const clientNameOnArray = clients.map(client => client.nome)
    createDefaultOption(GetSelectClient, "Selecione um cliente")
    clientNameOnArray.forEach(client => renderNamesOnSelect(client))
}

clientNameOnSelect()

const getFinalMessageArray = () => {
    const arr =  Object.values(finalOrderMessages)
    createDefaultOption(selectSituacao, "Aberta")
    arr.forEach((message, index) => putMessageOnSelect(message, index, selectSituacao))
}


const getReasonMessageArray = () => {
    const arr =  Object.values(typesOfOrders)
    arr.forEach((message, index) => putMessageOnSelect(message, index, selectMotivo))
}


const putMessageOnSelect = (message, i, select) => {
    i++
    const option = document.createElement("option")
    option.setAttribute("value", i)
    option.textContent = message
    select.append(option)
}


const addNewOrder = () => {
    const newOrder = {}
    const typeAsNumber = Number(document.querySelector("#motivo-select").value)
    const client = GetSelectClient.options[GetSelectClient.selectedIndex].text
    const situation = GetSelectSituation.options[GetSelectSituation.selectedIndex].text

    newOrder.id = orders.length + 1
    newOrder.type = typeAsNumber
    newOrder.client = client
    newOrder.message = document.querySelector("#message").value
    newOrder.date = document.querySelector("#date-os").value
    newOrder.situation = situation

    orders.push(newOrder)
    renderTable()
    setOrdersData()
    ordersPercentage()
    countOrders()
}

const cleanInputsOrders = () => {
    document.querySelector("#motivo-select").value = ""
    GetSelectClient.options[0].text = "Escolha um cliente"
    document.querySelector("#message").value = ""
    document.querySelector("#date-os").value = ""
    getFinalMessageArray()
}


const openEditOrderModal = target => {
    modalOsOverlay.style.display = "grid"

    const orderObj = orders[target]

    const { type, client, message, date, situation } = orderObj
    document.querySelector("#motivo-select").value = type
    GetSelectClient.options[0].text = client
    GetSelectSituation.options[0].text = situation
    document.querySelector("#message").value = message
    document.querySelector("#date-os").value = date

}

getReasonMessageArray()
getFinalMessageArray()


buttonSaveOrder.addEventListener("click", () =>{
    addNewOrder()
    modalOsOverlay.style.display = "none"
})
buttonCancelOrder.addEventListener("click", () => modalOsOverlay.style.display = "none")
buttonNewOrder.addEventListener("click", () => {
    modalOsOverlay.style.display = "grid"
    cleanInputsOrders()
})
buttonChangeOrder.addEventListener("click", e => {
    e.preventDefault()
    const target = e.target.getAttribute("data-id")
    orders[target].situation = GetSelectSituation.options[GetSelectSituation.selectedIndex].text

    modalOsOverlay.style.display = "none"
    countOrders()
    renderTable()
    setOrdersData()
    cleanInputsOrders()
})

table.addEventListener("click", event => {
    const target = event.target.getAttribute("data-id")
    const { message, id } = orders[target]
    messageOutput.textContent = ""
    messageOutput.textContent = message
    buttonChangeOrder.setAttribute("data-id", id - 1)

    openEditOrderModal(target)
}) 


