const imageForm = document.querySelector('#image-form')
const imageInput = document.querySelector('#image-input')
const length = document.querySelector('#fish-length').value 
const weight = document.querySelector('#fish-weight').value 
const picture = document.querySelector('#fish-pic').value


async function newFishImage(event) {
event.preventDefault()
  const file = imageInput.files[0];
  console.log(file);

  // get secure url from our server
  const { url } = await fetch('/s3URL').then(res => res.json())
  console.log(url)

  // post the image direclty to the s3 bucket
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: file
  })

  imageURL = url.split('?')[0]
  console.log(imageURL)

  const img = document.createElement("img")
  img.src = imageURL
  document.body.appendChild(img)
}

// function to call api and create a new fish
async function newFish(event) {
    

    event.preventDefault() 
    const response = await fetch(`/api/fishCaught`, {
        method: 'post',
        body: JSON.stringify({
            length,
            weight,
            //store URL in the fish object
            picture: image.imageURL
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
//image upload event listener
document.querySelector('#image-form').addEventListener('submit', newFishImage)
// event listener
document.querySelector('#new-fish-form').addEventListener('submit', newFish)