const kuzzle = require('./kuzzle-setup');

// Signup Logic
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  try {
    const result = await kuzzle.auth.createRestrictedUser({
      content: {
        email,
        password
      },
      credentials: {
        local: {
          username: email,
          password
        }
      }
    });
    console.log('User signed up:', result._id);
    signupForm.reset();
  } catch (error) {
    console.error(error.message);
  }
});

// Login Logic
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  try {
    const result = await kuzzle.auth.login('local', {
      username: email,
      password
    });
    console.log('User logged in:', result);
    loginForm.reset();
  } catch (error) {
    console.error(error.message);
  }
});

// Logout Logic
const logout = document.getElementById('logout');
logout.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    await kuzzle.auth.logout();
    console.log('User logged out');
  } catch (error) {
    console.error('Logout error:', error.message);
  }
});
