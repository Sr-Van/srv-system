alert("Para login: admin@admin.com Para senha: admin1234")


const credentials = [{
    email: "admin@admin.com",
    password: "admin1234"
}]


const btnLogin = document.querySelector("#submit-btn")

btnLogin.addEventListener("click", e =>{
    e.preventDefault()
    const boxLogin = document.querySelector(".login")
    const boxLoading = document.querySelector(".box-loading")
    const txtEmail = document.querySelector("#txt-email").value
    const txtPass = document.querySelector("#txt-pass").value
    const render = document.querySelector(".res")

    credentials.forEach(({ email, password }) => {
        if(email !== txtEmail || password !== txtPass){
            render.innerHTML = "Credentials incorrect."
            document.querySelector("#txt-email").value = ""
            document.querySelector("#txt-pass").value = ""
        } else{
            setTimeout(() => {
                btnLogin.classList.remove("cred-acepted")
                btnLogin.innerHTML = "Login"
                boxLogin.style.display = "none"
                boxLoading.style.display = "grid"
                setTimeout(()=>{
                    window.location.assign("/build/index.html")
                }, 3000)
                
            }, 1000);
            btnLogin.classList.add("cred-acepted")
            document.querySelector("#txt-email").value = ""
            document.querySelector("#txt-pass").value = ""
            btnLogin.innerHTML = "Valid, wait..."
            render.style.display = "none"
        }
    })
})