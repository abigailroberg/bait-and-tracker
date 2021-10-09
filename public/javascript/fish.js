const length = document.querySelector('#fish-length').value 
const weight = document.querySelector('#fish-weight').value 
const picture = document.querySelector('#fish-pic').value
const imageForm = document.querySelector("#image-form")
const imageInput = document.querySelector("#image-input")

//to store image fetch data from newFishImage
const image = {
    file = '',
    imageURL
}

async function newFishImage(event) {
event.preventDefault()
  image.file = imageInput.files[0]

  // get secure url from our server
  const { url } = await fetch("/s3URL").then(res => res.json())
  console.log(url)

  // post the image direclty to the s3 bucket
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: file
  })

  image.imageURL = url.split('?')[0]
  console.log(image.imageURL)

  const img = document.createElement("img")
  img.src = image.imageURL
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
imageForm.querySelector('#image-form').addEventListener("submit", newFishImage)
// event listener
document.querySelector('#new-fish-form').addEventListener('submit', newFish)