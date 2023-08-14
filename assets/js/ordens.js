let ordens = [
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

const getTypeOfOrders = ordem => {
    const { id, type, client, date, situation } = ordem
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
    ordens.forEach(ordem => getTypeOfOrders(ordem))
}

init()

const countOrders = () => {

    const messageCounterOnScreen = document.querySelector(".count-messages")
    const messageCounterToDoOnDiv = document.querySelector(".p-todo-os")

    const ordersOpened = ordens.filter(ordem => ordem.situation === "Aberta")

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

