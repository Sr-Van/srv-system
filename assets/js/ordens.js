let orders = [
    {
        id: 1,
        type: 1,
        client: "Marielson Silva",
        message: "Cliente sem internet a mais de 2 dias, nao conseguiu entrar em contato e por isso so solicitou atendimento hoje.",
        date: "25/10",
        situation: "Aberta"
    },
    {
        id: 2,
        type: 4,
        client: "Marielson Silva",
        message: "Cliente sem internet a mais de 2 dias, nao conseguiu entrar em contato e por isso so solicitou atendimento hoje.",
        date: "25/10",
        situation: "Aberta"
    },
    {
        id: 3,
        type: 7,
        client: "Marielson Silva",
        message: "Cliente sem internet a mais de 2 dias, nao conseguiu entrar em contato e por isso so solicitou atendimento hoje.",
        date: "25/10",
        situation: "Aberta"
    },
    {
        id: 4,
        type: 1,
        client: "Marielson Silva",
        message: "Cliente sem internet a mais de 2 dias, nao conseguiu entrar em contato e por isso so solicitou atendimento hoje.",
        date: "25/10",
        situation: "Fechada"
    }
]

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

const getTypeOfOrders = order => {
    const { id, type, client, date, situation } = order
    const typeToText = typesOfOrders[type]
    const table = document.querySelector(`[data-js="table-os"]`)
    const tr = document.createElement("tr")

    tr.classList.add("tr-padrao-os")
    tr.innerHTML = `
        <td data-id="${id}" style="cursor: pointer;">${typeToText}</td>
        <td>${client}</td>
        <td>${date}</td>
        <td>${situation}</td>
    `
    table.append(tr)
}

const init = () => {
    orders.forEach(order => getTypeOfOrders(order))
}

init()

const countOrders = () => {

    const messageCounterOnScreen = document.querySelector(".count-messages")
    const messageCounterToDoOnDiv = document.querySelector(".p-todo-os")

    const ordersOpened = orders.filter(order => order.situation === "Aberta")

    messageCounterOnScreen.textContent = ordersOpened.length
    messageCounterToDoOnDiv.textContent = ordersOpened.length
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

const selectSituacao = document.querySelector("#select-situacao")
const selectMotivo = document.querySelector("#motivo-select")

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

const buttonNewOrder = document.querySelector(".btn-nova-os")
const buttonSaveOrder = document.querySelector(".btn-salvar-ordem")
const buttonCancelOrder = document.querySelector(".btn-cancelar-ordem")
const buttonEndOrder = document.querySelector(".btn-finalizar-ordem")

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

    return orders.push(newOrder)
}

buttonSaveOrder.addEventListener("click", addNewOrder)


