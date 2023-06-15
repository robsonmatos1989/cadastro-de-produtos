const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sTipo = document.querySelector('#m-tipo')
const sPreco = document.querySelector('#m-preco')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id
//Essa função é utilizada para exibir o modal para o usuário por meio do 'active'
function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {//Aqui, após clicar no modal, é executada uma função anônima
    if (e.target.className.indexOf('modal-container') !== -1) {//Aqui, dentro da função anônima
      //é verificado se existe uma classe chamada 'modal-container', o qual é feito por meio do
      //e.target.className.indexOf('modal-container'). Então, se clicar fora do modal, o active 
      //é removido por meio do modal.classList.remove('active'), o que faz com que a interface
      //seja ocultada do usuário
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sTipo.value = itens[index].tipo
    sPreco.value = itens[index].preco
    id = index
  } else {
    sNome.value = ''
    sTipo.value = ''
    sPreco.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.tipo}</td>
    <td>R$ ${item.preco}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sTipo.value == '' || sPreco.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].tipo = sTipo.value
    itens[id].preco = sPreco.value
  } else {
    itens.push({'nome': sNome.value, 'tipo': sTipo.value, 'preco': sPreco.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
