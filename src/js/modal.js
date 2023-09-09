const createElement = element => {
    return document.createElement(element)
}

const addLabelInput = (label, input) => {
    editOrderInnerModalContent.append(label)
    editOrderInnerModalContent.append(input)
}

const editOrderModal = createElement('div')
const editOrderInnerModal = createElement('div')
const editOrderInnerModalHeader = createElement('div')
const editOrderInnerModalContent = createElement('div')

const btnFinalizarOrder = createElement('a')
const btnCancelOrder = createElement('a')



const createModalEditOs = () => {
    editOrderModal.innerHTML = ""
    
    editOrderModal.setAttribute('class', 'modal-overlay modal-e-os-overlay modal-anim')
    editOrderModal.setAttribute('style', 'display: none;')
    
    editOrderInnerModal.setAttribute('class', 'new-modal-anim edit-os-modal')
    
    editOrderInnerModalHeader.classList.add('header-os-edit')
    
    const mainContainer = document.querySelector('.main-tag')
    
    btnCancelOrder.setAttribute('class', 'btn-style btn-cancelar-ordem')
    btnCancelOrder.textContent = "Cancelar"
    
    btnFinalizarOrder.setAttribute('class', 'btn-style btn-change-ordem')
    btnFinalizarOrder.textContent = "Finalizar"
    
    editOrderInnerModalHeader.append(btnFinalizarOrder)
    editOrderInnerModalHeader.append(btnCancelOrder)
    
    
    editOrderInnerModalContent.setAttribute('class', 'form-e-os')
    
    const labelMotivo = createElement('label')
    editSelectMotivo = createElement('select')
    
    labelMotivo.textContent = 'Motivo:'
    editSelectMotivo.setAttribute('name', 'motivo-e-select')
    editSelectMotivo.setAttribute('id', 'motivo-e-select')
    arrReasonMessage.forEach((message, index) => putMessageOnSelect(message, index, editSelectMotivo))
    addLabelInput(labelMotivo, editSelectMotivo)
    
    const labelClient = createElement('label')
    selectClient = createElement('select')    
    
    labelClient.textContent = 'Cliente:'
    addLabelInput(labelClient, selectClient)
    clientNameOnArray.forEach(client => renderNamesOnSelect(client, selectClient))

    
    const dateOs = createElement('input')
    const labelDate = createElement('label')
    
    labelDate.textContent = 'Data de abertura:'
    
    dateOs.setAttribute('type', 'date')
    dateOs.setAttribute('id', 'date-e-os')
    
    
    addLabelInput(labelDate, dateOs)
    
    const inputObs = createElement('input')
    const labelObs = createElement('label')
    
    inputObs.setAttribute('type', 'text')
    inputObs.setAttribute('style', 'width: min(100%, 18.75rem); background-color: var(--white-color);border-radius: .2em;')
    inputObs.setAttribute('placeholder', 'insira os detalhes da ordem')
    inputObs.setAttribute('id', 'message-edit')
    
    labelObs.textContent = 'Obs:'
    
    addLabelInput(labelObs, inputObs)


    selectSituation = createElement('select')
    const labelSituation = createElement('label')
    labelSituation.textContent = 'Situacao'
    createDefaultOption(selectSituacao, "")
    arrFinalMessage.forEach((message, index) => putMessageOnSelect(message, index, selectSituation))
    
    
    addLabelInput(labelSituation, selectSituation)
    
    editOrderInnerModal.prepend(editOrderInnerModalContent)
    
    editOrderInnerModal.prepend(editOrderInnerModalHeader)
    
    editOrderModal.append(editOrderInnerModal)
    
    mainContainer.append(editOrderModal)
}


btnFinalizarOrder.addEventListener('click', () => {
    
    const target = targetOrder
    orders[target].situation = selectSituation.options[selectSituation.selectedIndex].text

    editOrderModal.style.display = "none"
    countOrders()
    renderTable()
    setOrdersData()
    cleanInputsOrders()
    getFeedback()
    showAlert("Ordem alterada")
})


btnCancelOrder.addEventListener('click', () => modalEdit.style.display = 'none')
