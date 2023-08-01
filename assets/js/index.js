

let clients = [{
    nome: 'Teste1 joaozinho sales dos santos',
    CPF: 99999999911,
    RG: 1301300001,
    Telefone: 77999999999,
    Endereço: 'rua sei',
    Numero: 120,
    Bairro: 'horto city',
    Sexualidade: 'masculino',
    plano: '250mb'
},
{
    nome: 'Teste2',
    CPF: 99999999911,
    RG: 1301300001,
    Telefone: 77999999999,
    Endereço: 'rua sei la o que',
    Numero: 120,
    Bairro: 'new city',
    Sexualidade: 'masculino',
    plano: '250mb'
},
{
    nome: 'Teste3',
    CPF: 99999999911,
    RG: 1301300001,
    Telefone: 77999999999,
    Endereço: 'rua sei la o que',
    Numero: 120,
    Bairro: 'new city',
    Sexualidade: 'masculino',
    plano: '250mb'
},
{
    nome: 'Teste32',
    CPF: 99999999911,
    RG: 1301300001,
    Telefone: 77999999999,
    Endereço: 'rua sei la o que',
    Numero: 120,
    Bairro: 'new city',
    Sexualidade: 'masculino',
    plano: '250mb'
}

,
{
    nome: 'Teste31',
    CPF: 99999999911,
    RG: 1301300001,
    Telefone: 77999999999,
    Endereço: 'rua sei la o que',
    Numero: 120,
    Bairro: 'new city',
    Sexualidade: 'masculino',
    plano: '250mb'
}
]

/* Declarando botoes do sidebar */
const dashboardBtn = document.querySelector('.dashboard-btn')
const cadastrosBtn = document.querySelector('.cadastros-btn')
const contasBtn = document.querySelector('.contas-btn')
const osBtn = document.querySelector('.os-btn')

/* Declarando conteudos */
const dashContent = document.querySelector('.dashboard-content')
const cadastroContent = document.querySelector(".cadastros")

dashboardBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    dashboardBtn.classList.add("active")
    cadastrosBtn.classList.remove("active")
    contasBtn.classList.remove("active")
    osBtn.classList.remove("active")


    dashContent.style.display = 'grid' //mostrando o conteudo da div dashboard-content apenas quando o botao dashboard estiver ativo
    unSelect(cadastroContent)
})

cadastrosBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    cadastrosBtn.classList.add("active")
    dashboardBtn.classList.remove("active")
    contasBtn.classList.remove("active")
    osBtn.classList.remove("active")

    unSelect(dashContent)
    cadastroContent.style.display = 'block'
    tableLoad()
})

contasBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    contasBtn.classList.add("active")
    dashboardBtn.classList.remove("active")
    cadastrosBtn.classList.remove("active")
    osBtn.classList.remove("active")

    unSelect(dashContent)
})

osBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    osBtn.classList.add("active")
    dashboardBtn.classList.remove("active")
    cadastrosBtn.classList.remove("active")
    contasBtn.classList.remove("active")

    unSelect(dashContent)
})

//TODO: create a function to use less lines on the eventListener arrow functions

//TODO: add the div to unselect on anchor2 e 3
function unSelect(anchor1, anchor2, anchor3){
    anchor1.style.display = "none"
    /* anchor2.style.display = "none"
    anchor3.style.display = "none" */
}


// search [FIX]

const search = document.querySelector("#search")
const render = document.querySelector("div.show-client")
const alertBox = document.querySelector("div.alert")

function searchInKeyUp(event){
    let searched = event.target.value
    console.log(searched)

    let clientFound = filterSearch(searched)
    console.log(clientFound)

    let list = ' '

    if(searched.length<=0){
        setTimeout(()=>{
            alertBox.style.display = 'none'
            render.style.display = 'none'
            dashboardBtn.classList.add("active")
            dashContent.classList.add("back-animation")
            dashContent.style.display = 'grid'
        }, 1000)
        alertBox.style.display = 'flex'
        alertBox.innerHTML = 'Digite o nome de um cliente para mostrar o cadastro no dashboard.'

        dashContent.style.display = 'none'
    }else{

        //desativando os botoes da sidebar
        osBtn.classList.remove("active")
        dashboardBtn.classList.remove("active")
        cadastrosBtn.classList.remove("active")
        contasBtn.classList.remove("active")
        dashContent.style.display = 'none'
        clientFound.forEach((client, index)=>{
            list += `
                <div class='show-multiples'>
                    <div class='edit-client' onclick='editClient()'><span class="material-symbols-sharp">
                    edit
                    </span></div>
                    <div class='atributos'>
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
                    </div>
                </div>
            `
        })
    }
    render.style.display = 'flex'
    render.innerHTML = list
}


search.addEventListener('keyup', _.debounce(searchInKeyUp, 400))

function filterSearch(searched){
    return clients.filter((client =>{
        return client.nome.toLowerCase().includes(searched.toLowerCase())
    }))
}

// deleted the cadastros.js because i was having some modules problemas, still working here



// adding a counter to my tableLoad no keep adding the same things on the table while a click a lot of times in the buttons

let counterFunc = 0

function tableLoad(){
    let tableList
    let table = document.querySelector(".client-tb")
    if(counterFunc === 0){
        clients.forEach((client, index)=>{
            tableList = `
                <tr style="width: 100%; font-size: 12px; display: grid; grid-template-columns: repeat(7, 1fr); border-bottom: 1px solid; padding: 3px; background-color: var(--purple-light);">
                    <td style="width: 300px;">
                        <a style="cursor: pointer; padding-right: 5px;"><span style="font-size: 12px; color: var(--white-color);" class="material-symbols-sharp">
                        open_in_new
                        </span></a>
                        ${client.nome}
                    </td>
                    <td style="width: 100px; text-align: start;">${client.plano}</td>
                    <td style="width: 100px;"> ${client.CPF}</td>
                    <td style="width: 80px;">${client.RG}</td>
                    <td style="width: 80px;">${client.Telefone}</td>
                    <td style="width: 80px;">${client.Bairro}</td>
                    <td style="width: 200px;">${client.Endereço}</td>
                `
            table.innerHTML += tableList
        })
    }
    counterFunc++
    console.log(counterFunc)
}



//declarando botoes do cadastro e modal

const btnNovoCad = document.querySelector(".novo-cadastro")
const modal = document.querySelector(".modal-overlay")
const btnSalvarCad = document.querySelector(".btn-salvar")
const btnCancelCad = document.querySelector(".btn-cancelar")

btnNovoCad.addEventListener("click", ()=>{
    modal.style.display = "grid"
})

btnCancelCad.addEventListener("click", ()=>{
    modal.style.display = "none"
})


//adicionando novo cadastro no array de cadastros

btnSalvarCad.addEventListener("click",newClientAdd)

function newClientAdd(){
    let newClient = {}

    newClient.nome = document.querySelector("#txt-nome").value
    newClient.CPF = document.querySelector("#txt-cpf").value
    newClient.RG = document.querySelector("#txt-rg").value
    newClient.Telefone = document.querySelector("#txt-tel").value
    newClient.Endereço = document.querySelector("#txt-endereco").value
    newClient.Numero = document.querySelector("#txt-nume").value
    newClient.Bairro = document.querySelector("#txt-bairro").value
    newClient.Sexualidade = document.getElementsByName("sex-radio").value
    newClient.plano = document.querySelector("#select-plano").value
    newClient.vencimento = document.querySelector("#select-venc").value

    clients.push(newClient)
    tableLoad()
}


