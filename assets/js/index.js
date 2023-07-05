

let clients = [

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

function searchInKeyUp(){
    console.log('yes')
}


search.addEventListener('keyup', _.debounce(searchInKeyUp, 400))


