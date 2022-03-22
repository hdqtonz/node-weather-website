const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message_One')
const messageTwo = document.querySelector('#message_Two')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const loaction = search.value
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + loaction).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forcast.temperature
                console.log(data.forcast)
            }
        })
    })
})