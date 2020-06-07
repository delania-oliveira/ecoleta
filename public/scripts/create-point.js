// formulário 

function populateUfs() { 
    
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
       
    })
}

populateUfs()

function getCities (event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
       citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//itens de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

//atualizar o input hidden com os items selecionados p1
const collectedItems = document.querySelector("input[name=items]")

//coleção de dados (array) 
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    
    //adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //console.log('ITEM ID: ', itemId)

    //verificar se existem items selecionados, se sim
    // pegar os items selecionados
    const alreadySelected = selectedItems.findIndex( function(item) {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })
    /* modelo resumido
    const alreadySelected = selectItems.findIndex( item => item == itemId ) */

    //se já estiver selecionado, 
    if(alreadySelected >= 0) {
        //tirar da seleção 
        const filteredItems = selectedItems.filter(function(item) {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }   else {
        // se não estiver selecinado
        // adicionar à seleção
            selectedItems.push(itemId)
        }
    
    //console.log('selectedItens: ', selectedItems)
    
    //atualizar o input hidden com os items selecionados p2
    collectedItems.value = selectedItems
}   

