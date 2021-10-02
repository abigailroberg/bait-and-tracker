// TODO: Add functions for handling the signup and login forms
// Code here

// Function for handling clicking on the login link (has the logout button and profile in the nav)
async function login() {
  const response = await fetch('/api/users/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#login').addEventListener('click', login);