const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sTipo = document.querySelector('#m-tipo')
const sPreco = document.querySelector('#m-preco')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id
//Essa função é utilizada para exibir o modal para o usuário por meio do 'active'
function openModal(edit = false, index = 0) {//não é passado nenhum parâmetro
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
    sNome.value = itens[index].nome //Aqui eu carrego para o modal o nome, o tipo e o preço
    sTipo.value = itens[index].tipo
    sPreco.value = itens[index].preco
    id = index  // aqui é carregado o index para o id
  } else {  // caso não seja uma edição, é carregado o modal com valores vazios
    sNome.value = ''
    sTipo.value = ''
    sPreco.value = ''
  }
  
}



btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sTipo.value == '' || sPreco.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {//se for diferente de indefinido, ou seja, se veio de uma edição
    // ele irá carregar os valos em tela para aquele [id]
    itens[id].nome = sNome.value
    itens[id].tipo = sTipo.value
    itens[id].preco = sPreco.value
  } else { //se não é edição, é adicionado um novo item 
    itens.push({'nome': sNome.value, 'tipo': sTipo.value, 'preco': sPreco.value})
  }

  setItensBD()// e novamente é atualizado o banco de dados, sendo edição ou exclusão

  modal.classList.remove('active')// aí ele fecha o modal
  loadItens() // e carrega os itens em tela
  id = undefined // e vai deixar o id como indefinido
}

function loadItens() {
  itens = getItensBD()// essa função carrega os itens que foram buscados dentro do banco de 
  //dados para dentro da variavel itens
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)// aqui eu chamo a função para que seja criado em cada linha
    // um novo item com o seu index
  })

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

function editItem(index) {// quando entro nessa função, é passado o index para o qual quero
  // fazer a edição

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1) //o splice permite modificar o elemento dentro do array
  //o número 1 que está dentro do parênteses serve para informar que está sendo deletado um item 
  setItensBD()// aí aqui é atualizado o banco de dados
  loadItens()// e em seguinda é carregado novamente os dados na tela, é exibido a lista
}

//aqui se busca os itens dentro do banco dbfunc, caso não tenha nada, é retornado um array vazio
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
//aqui é setado as informações dos (itens) para dentro do banco de dados
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))



loadItens()