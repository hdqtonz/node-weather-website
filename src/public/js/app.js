
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message_One')
const messageTwo = document.querySelector('#message_Two')

// messageOne.textContent = ''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const loaction = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + loaction).then((response) => {
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