// login form submission
async function loginFormHandler(event) {
  event.preventDefault();

  // get email and password from form entry
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // check for email and password entered
  if (email && password) {
    const response = await fetch('/api/competitors/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // return to homepage if successful log in
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);