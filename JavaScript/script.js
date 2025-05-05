document.addEventListener("DOMContentLoaded", function () {
  const formRegistro = document.getElementById("formRegistro");
  if (formRegistro) {
    formRegistro.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const password = document.getElementById("contraseña").value;
      const confirmPassword = document.getElementById("confirmar-contraseña").value;

      // Validaciones
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      // Crear objeto usuario
      const nuevoUsuario = {
        nombre: nombre,
        correo: correo,
        password: password,
        fechaRegistro: new Date().toLocaleString(),
      };

      // Guardar en localStorage
      localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));

      alert("Registro exitoso. Serás redirigido para iniciar sesión.");
      setTimeout(() => {
        window.location.href = "inicio.html";
      }, 1500);
    });
  }

  // Manejo del formulario de login
  const formLogin = document.querySelector('form[action="/login"]');
  if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
      e.preventDefault();

      const correo = document.getElementById("correo").value.trim();
      const password = document.getElementById("contraseña").value;

      // Obtener usuario registrado
      const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioRegistrado"));
      if (usuarioGuardado && usuarioGuardado.correo === correo && usuarioGuardado.password === password) {
        alert(`Bienvenido ${usuarioGuardado.nombre}`);
        // Guardar sesión
        sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioGuardado));

        // Redirigir al index.html
        window.location.href = "index.html";
      } else {
        alert("Correo o contraseña incorrectos");
      }
    });
  }

  // Mostrar el nombre del usuario si está logueado
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
  if (usuarioLogueado) {
    document.getElementById("registrarse").style.display = "none";
    document.getElementById("iniciarSesion").style.display = "none";
    const usuarioNombre = document.getElementById("usuarioNombre");
    usuarioNombre.textContent = `Hola, ${usuarioLogueado.nombre}`;
    usuarioNombre.style.display = "inline";
  }

  
});