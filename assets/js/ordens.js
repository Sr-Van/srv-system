let ordens = [
    {
        id: 1,
        type: 1,
        client: "Marielson Silva",
        message: "Cliente sem internet a mais de 2 dias, nao conseguiu entrar em contato e por isso so solicitou atendimento hoje.",
        date: "25/10"
    },
    {
        id: 2,
        type: 4,
        client: "Marielson Silva",
        message: "Cliente sem internet a mais de 2 dias, nao conseguiu entrar em contato e por isso so solicitou atendimento hoje.",
        date: "25/10"
    },
    {
        id: 3,
        type: 7,
        client: "Marielson Silva",
        message: "Cliente sem internet a mais de 2 dias, nao conseguiu entrar em contato e por isso so solicitou atendimento hoje.",
        date: "25/10"
    }

]

const typesOfOrders = {
    1: "instalacao",
    2: "Troca de roteador",
    3: "lentidao ao jogar",
    4: "lentidao em endereco web especifico",
    5: "Remocao de equipamento",
    6: "Velocidade nao corresponde ao plano",
    7: "Troca de plano",
    8: "Problema externo",
    9: "Feedback do cliente"
}

const getTypeOfOrders = ordem => {
    const { type, client, date } = ordem
    const typeToText = typesOfOrders[type]
    const table = document.querySelector(`[data-js="table-os"]`)
    const tr = document.createElement("tr")

    tr.classList.add("tr-padrao-os")
    tr.innerHTML = `
        <td>${typeToText}</td>
        <td>${client}</td>
        <td>${date}</td>
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
    messageCounterOnScreen.textContent = ordens.length
    messageCounterToDoOnDiv.textContent = ordens.length
}

countOrders()