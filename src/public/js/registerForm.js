async function registerSubmit(e) {
  e.preventDefault();

  const inputs = {
    name: e.target.nombre.value,
    username: e.target.usuario.value,
    email: e.target.email.value,
    password: e.target.password.value,
    confirmPassword: e.target.passwordCheck.value,
    phoneNumber: e.target.phoneNumber.value,
  };
  let { name, username, email, password, confirmPassword, phoneNumber } =
    inputs;

  let errorFound = false;

  const validateNames =
    /^[a-zA-Z0-9.!#@$%&'*+/=?^_`{|}~-]{1}[a-zA-Z0-9.!#@$%&'*+/=?^_`{|}~-\s]*$/;
  const validateMexicanNames =
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
  if (
    !name ||
    (!validateNames.test(name) && !validateMexicanNames.test(name))
  ) {
    document.getElementById('nombreFeedback').textContent =
      'Escribe tu nombre.';
    errorFound = true;
  } else {
    document.getElementById('nombreFeedback').textContent = '';
  }

  if (!username || !validateNames.test(username)) {
    document.getElementById('usuarioFeedback').textContent =
      'Escribe un nombre de usuario.';
    errorFound = true;
  } else {
    document.getElementById('usuarioFeedback').textContent = '';
  }

  // HTML5 Specification
  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email || !emailPattern.test(email)) {
    document.getElementById('correoFeedback').textContent =
      'Escribe un correo electrónico válido.';
    errorFound = true;
  } else {
    document.getElementById('correoFeedback').textContent = '';
  }

  const phonePattern = /^[0-9]{10}$/;
  if (!phoneNumber || !phonePattern.test(phoneNumber)) {
    document.getElementById('phoneFeedback').textContent =
      'Deben ser 10 dígitos solamente.';
    errorFound = true;
  } else {
    document.getElementById('phoneFeedback').textContent = '';
  }

  const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!password || !passwordPattern.test(password)) {
    document.getElementById('passwordFeedback').textContent =
      'Esta contraseña no es válida.';
    errorFound = true;
  } else {
    document.getElementById('passwordFeedback').textContent = '';
  }

  if (!confirmPassword) {
    document.getElementById('passwordCheckFeedback').textContent =
      'Escribe la contraseña de nuevo.';
    errorFound = true;
  } else if (password !== confirmPassword) {
    document.getElementById('passwordCheckFeedback').textContent =
      'Las contraseñas no coinciden.';
    errorFound = true;
  } else {
    document.getElementById('passwordCheckFeedback').textContent = '';
  }

  if (errorFound) {
    return;
  }

  try {
    const response = await axios.post('/user/register', inputs);
    // console.log(response);

    // const loc = location as typeof location & {
    //   state: {from: string}
    // }

    // if (loc.state && loc.state.from) {
    //   navigate(loc.state.from);
    //   return;
    // }

    location.assign('/');
  } catch (error) {
    console.error(error);
    // alert(error.msg);
  }
}

function init() {
  document
    .getElementById('registerForm')
    .addEventListener('submit', registerSubmit);
}

document.addEventListener('DOMContentLoaded', init, false);
