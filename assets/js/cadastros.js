

function tableLoad(){
    let tableList
    let table = document.querySelector(".client-tb")
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

window.addEventListener("load", tableLoad)