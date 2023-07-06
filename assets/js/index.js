

let clients = [{
    nome: 'Teste1',
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


const dashboardBtn = document.querySelector('a.dashboard-btn')
const cadastrosBtn = document.querySelector('a.cadastros-btn')
const contasBtn = document.querySelector('a.contas-btn')
const osBtn = document.querySelector('a.os-btn')


dashboardBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    dashboardBtn.classList.add("active")
    cadastrosBtn.classList.remove("active")
    contasBtn.classList.remove("active")
    osBtn.classList.remove("active")
})

cadastrosBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    cadastrosBtn.classList.add("active")
    dashboardBtn.classList.remove("active")
    contasBtn.classList.remove("active")
    osBtn.classList.remove("active")
})

contasBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    contasBtn.classList.add("active")
    dashboardBtn.classList.remove("active")
    cadastrosBtn.classList.remove("active")
    osBtn.classList.remove("active")
})

osBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    osBtn.classList.add("active")
    dashboardBtn.classList.remove("active")
    cadastrosBtn.classList.remove("active")
    contasBtn.classList.remove("active")
})


// search [FIX]

const search = document.querySelector("#search")
const render = document.querySelector("div.show-client")

function searchInKeyUp(event){
    let searched = event.target.value
    console.log(searched)

    let clientFound = filterSearch(searched)
    console.log(clientFound)

    let list = ' '

    if(searched.length<=0){
        /* setTimeout(()=>{
            alertBox.style.display = 'none'
        }, 3000)
        alertBox.style.display = 'flex'
        alertBox.innerHTML = 'Digite o nome de um cliente para mostrar o cadastro no dashboard.'
        dashboard.style.display = 'flex' */
    }else{

        //desativando os botoes da sidebar
        osBtn.classList.remove("active")
        dashboardBtn.classList.remove("active")
        cadastrosBtn.classList.remove("active")
        contasBtn.classList.remove("active")
        /* dashboard.style.display = 'none' */
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