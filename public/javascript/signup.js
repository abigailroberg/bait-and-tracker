// signup form submission
async function signupFormHandler(event) {
    event.preventDefault();
  
    // get name, email, phone and password from form entry
    const name = document.querySelector('#name-signup').value.trim()
    const email = document.querySelector('#email-signup').value.trim();
    const phone = document.querySelector('#phone-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    // check for name and email and password entered
    if (name && email && phone && password) {
      const response = await fetch('/api/competitors', {
        method: 'post',
        body: JSON.stringify({
            name,
            email,
            phone,
            password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // return to homepage if successful sign up
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);