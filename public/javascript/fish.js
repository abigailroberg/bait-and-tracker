// function to call api and create a new fish
async function newFish(event) {
    event.preventDefault()

    const length = document.querySelector('#fish-length').value 
    const weight = document.querySelector('#fish-weight').value 
    const picture = document.querySelector('#fish-pic').value 
    
    const response = await fetch(`/api/fishCaught`, {
        method: 'post',
        body: JSON.stringify({
            length,
            weight,
            picture
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.ok) {
        document.location.replace('/')
    } else {
        alert(response.statusText)
    }
}

// event listener
document.querySelector('#new-fish-form').addEventListener('submit', newFish)