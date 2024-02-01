const wrapper = document.querySelector('.wrapper')
const form = document.querySelector('form')
const fileInput = document.querySelector('input')
const infoText = document.querySelector('p')
const closeBtn = document.querySelector('.close')
const copyBtn = document.querySelector('.copy')

function fetchRequest(file, formData) {
    infoText.innerText = 'Escaneando QR Code...'
    fetch('http://api.qrserver.com/v1/read-qr-code/', {
        method: 'POST', body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data
        infoText.innerText = result ? 'Carregando QR Code para Escanear' : 'Não é Possivel Escanear QR Code'
        if(!result) return
        document.querySelector('textarea').innerText = result
        form.querySelector('img').src = URL.createObjectURL(file)
        wrapper.classList.add('active')
    }).catch(() => {
        infoText.innerText = 'Não é Possivel Escanear QR Code'
    })
}

fileInput.addEventListener('change', async e => {
    let file = e.target.files[0]
    if(!file) return
    let formData = new FormData()
    formData.append('file', file)
    fetchRequest(file, formData)
})

copyBtn.addEventListener('click', () => {
    let text = document.querySelector('textarea').textContent
    navigator.clipboard.writeText(text)
})

form.addEventListener('click', () => fileInput.click())
closeBtn.addEventListener('click', () => wrapper.classList.remove('active'))