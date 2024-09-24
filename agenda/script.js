document.addEventListener('DOMContentLoaded', ()=>{
    
    IniciarContatos()

})


function salvarContatos(contatos){
    localStorage.setItem('contatos', JSON.stringify(contatos))
}

function ObterContatos(){
    return JSON.parse(localStorage.getItem('contatos') || '[]')
}

function resetar(){

    document.querySelector('#nome').value = ''
    document.querySelector('#email').value = ''
    document.querySelector('#telefone').value = ''

}

function CadastrarContato(){

    const nome = document.querySelector('#nome').value
    const email = document.querySelector('#email').value
    const telefone = document.querySelector('#telefone').value

    const novoContato = {id: Date.now(), nome, email, telefone}

    const contatos = ObterContatos()

    contatos.push(novoContato)

    salvarContatos(contatos)

    IniciarContatos()

    resetar()

}

function AlterarContato(id){

    const contatos = ObterContatos()

    const contato = contatos.find(c => c.id === id)

    if(contato){
        document.getElementById('nome').value = contato.nome
        document.getElementById('email').value = contato.email
        document.getElementById('telefone').value = contato.telefone
        ExcluirContato(id)
    }

}

function ExcluirContato(id){

    let contatos = ObterContatos()

    contatos = contatos.filter(contato => contato.id !== id)
    //se ele for diferente n faca nada, se for igual faca = '!=='
    //se ele for diferente faca, se for igual n faca nada = '==='

    salvarContatos(contatos)
    IniciarContatos()

}


function FiltrarContatos(){

    const valorFiltro = document.querySelector('.filtro').value.toLowerCase()
    const contatos = ObterContatos()

    const listaFiltrada = contatos.filter((contato)=>{

        return  contato.nome.toLowerCase().includes(valorFiltro) || 
                contato.telefone.includes(valorFiltro) ||
                contato.email.toLowerCase().includes(valorFiltro) 
    })

    IniciarContatos(listaFiltrada)

}

function contador(){

    const contatos = ObterContatos()
    let total = contatos.length

    document.querySelector('.quantidadeContatos').textContent = total
    
}

const IniciarContatos = (contatos = ObterContatos()) =>{

    const tbody = document.querySelector('#corpoTabela')
    tbody.innerHTML = ''

    contatos.forEach(contato => {

        const tr = document.createElement('tr')

        tr.innerHTML = `
                        <td>${contato.nome}</td>
                        <td>${contato.email}</td>
                        <td>${contato.telefone}</td>

                        <td>
                            <button class="BtnAlterar" onclick="AlterarContato(${contato.id})">Alterar</button>
                            <button class="BtnExcluir" onclick="ExcluirContato(${contato.id})">Excluir</button>
                        </td>
                        `
        tbody.appendChild(tr)
        
    });

    contador()
}