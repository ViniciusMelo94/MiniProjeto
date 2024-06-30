const btnADD = document.getElementById('btn-add')
const btnClear = document.getElementById('btn-clear')
const inputValue = document.getElementById('input-text')
const list = document.getElementById('list')

// Função para carregar a lista do localStorage e exibi-la

function carregarLocalStorage() {
    const listaLocalStorage = JSON.parse(localStorage.getItem('meus-interesses')) || [];
    list.innerHTML = '';
    listaLocalStorage.forEach(item => {
        const listaADD = document.createElement('li')
        listaADD.innerHTML = item
        list.appendChild(listaADD)
    })
}

carregarLocalStorage()

// Adicionar item à lista e ao localStorage

btnADD.addEventListener('click', () => {
    const valorInput = inputValue.value.trim()
    if (valorInput) {
        const listaADD = document.createElement('li')
        const listaLocalStorage = JSON.parse(localStorage.getItem('meus-interesses')) || [];
        listaLocalStorage.push(valorInput)
        localStorage.setItem('meus-interesses', JSON.stringify(listaLocalStorage))
        listaADD.innerHTML = valorInput
        list.appendChild(listaADD)
        inputValue.value = ''
    }
})

// Limpar a lista e o localStorage

btnClear.addEventListener('click', () => {
    localStorage.removeItem('meus-interesses')
    const list = document.getElementById('list')
    list.innerHTML = ''
})

// Função assíncrona para buscar notícias

async function noticias() {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release')
    const data = await response.json()
    const newsTitle = data.items[0].titulo
    const newsTitleToday = document.querySelector('.title-news-today')
    newsTitleToday.textContent = newsTitle
}

noticias()

// Atualizar a lista a cada segundo para garantir que esteja sincronizada com o localStorage

setInterval(carregarLocalStorage, 1000)