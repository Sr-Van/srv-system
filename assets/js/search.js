

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

const filterSearch = searched => {
    const selectFilter = document.querySelector("#select-filter").value
    if(selectFilter === "nome"){
        return clients.filter(( client => {
            return client.nome.toLowerCase().includes(searched.toLowerCase())
        }))
    } else if(selectFilter === "CPF") {
        return clients.filter(( client => {
            return client.CPF.toLowerCase().includes(searched.toLowerCase())
        }))
    } 
    return clients.filter(( client => {
        return client.Endereço.toLowerCase().includes(searched.toLowerCase())
    }))
    
}

const searchInKeyUp = event => {
    let searched = event.target.value

    clientFound = filterSearch(searched)

    if(searched.trim().length<=0){
        setTimeout(()=>{
            desativeRender()
            activeBtn(dashboardBtn)
            desativeBtn(osBtn, cadastrosBtn, contasBtn)
            dashContent.style.display = 'grid'
            alertBox.style.display = 'none'
        }, 1000)
        alertBox.style.display = 'flex'
        alertBox.innerHTML = 'Digite o nome de um cliente para mostrar o cadastro no dashboard.'

        unSelect(render, cadastroContent, contasContent, ordensContent) 
        return
    }

    unSelect(render, cadastroContent, contasContent, ordensContent)
    render.innerHTML = ""
    clientFound.forEach((client, index) => renderInSearch(client, index))
}

search.addEventListener('keyup', _.debounce(searchInKeyUp, 400))