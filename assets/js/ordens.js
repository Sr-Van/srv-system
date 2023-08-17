
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
    4: "lentidao ao jogar",
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
const buttonCancelOrder = document.querySelector(".btn-cancelar-ordem")
const buttonEndOrder = document.querySelector(".btn-finalizar-ordem")
const modalOverlay = document.querySelector(".modal-os-overlay")
const messageOutput = document.querySelector(".output")
const progressDoneCount = document.querySelector(".status1")
const progressTodoCount = document.querySelector(".status2")
const messageCounterOnScreen = document.querySelector(".count-messages")
const messageCounterToDoOnDiv = document.querySelector(".p-todo-os")
const messageCounterDoneOnDiv = document.querySelector(".p-done-os")
const messageCounterToDoOndash = document.querySelector(".p-orders-dash-todo")
const messageCounterdoneOndash = document.querySelector(".p-orders-dash-done")

const getTypeOfOrders = (order, index) => {
    const { id, type, client, date, situation } = order
    const typeToText = typesOfOrders[type]
    const tr = document.createElement("tr")

    tr.classList.add("tr-padrao-os")
    tr.innerHTML = `
        <td data-id="${index}" style="cursor: pointer;">${typeToText}</td>
        <td>${client}</td>
        <td>${date}</td>
        <td>${situation}</td>
    `
    table.append(tr)
}

const renderTable = () => {
    table.innerHTML = ""
    orders.forEach((order, index) => getTypeOfOrders(order, index))
}

renderTable()

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
}

countOrders()

const renderNamesOnSelect = name => {
    const select = document.querySelector("#cliente-select")
    const option = document.createElement("option")
    option.textContent = name
    select.append(option)
}

const clientNameOnSelect = () => {
    const clientNameOnArray = clients.map(client => client.nome)
    clientNameOnArray.forEach(client => renderNamesOnSelect(client))
}

clientNameOnSelect()

const getFinalMessageArray = () => {
    const arr =  Object.values(finalOrderMessages)
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

getFinalMessageArray()
getReasonMessageArray()


const addNewOrder = () => {
    const newOrder = {}
    const GetSelectClient = document.querySelector("#cliente-select")
    const GetSelectSituation = document.querySelector("#select-situacao")
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
}


buttonSaveOrder.addEventListener("click", addNewOrder)
buttonCancelOrder.addEventListener("click", () => modalOverlay.style.display = "none")
buttonNewOrder.addEventListener("click", () => modalOverlay.style.display = "grid")

table.addEventListener("click", event => {
    const target = event.target.getAttribute("data-id")
    const { message } = orders[target]
    messageOutput.textContent = ""
    messageOutput.textContent = message
})




