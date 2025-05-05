document.addEventListener("DOMContentLoaded", () => {
    const inputBusqueda = document.getElementById("busquedaCanciones");
    const recomendacionesTitulo = document.querySelector(".spotify-playlists h2");
    const listaCanciones = document.querySelector(".spotify-playlists .list");
    const items = document.querySelectorAll(".spotify-playlists .item");
  
    if (inputBusqueda) {
      inputBusqueda.addEventListener("focus", () => {
        // Ocultar título al hacer clic
        if (recomendacionesTitulo) recomendacionesTitulo.classList.add("oculto");
      });
  
      inputBusqueda.addEventListener("input", function () {
        const filtro = this.value.toLowerCase();
        let resultadosVisibles = 0;
  
        items.forEach(item => {
          const nombre = item.querySelector("h4").textContent.toLowerCase();
          const descripcion = item.querySelector("p").textContent.toLowerCase();
          const coincide = nombre.includes(filtro) || descripcion.includes(filtro);
  
          item.style.display = coincide ? "block" : "none";
          if (coincide) resultadosVisibles++;
        });
  
        // Mostrar título solo si no hay texto
        if (filtro === "") {
          recomendacionesTitulo.classList.remove("oculto");
          listaCanciones.classList.remove("oculto");
        } else {
          listaCanciones.classList.remove("oculto"); // Asegura que se muestre la lista filtrada
        }
      });
  
      inputBusqueda.addEventListener("blur", () => {
        // Si no hay texto, restaurar todo al salir del input
        if (inputBusqueda.value.trim() === "") {
          recomendacionesTitulo.classList.remove("oculto");
          listaCanciones.classList.remove("oculto");
          items.forEach(item => item.style.display = "block");
        }
      });
    }
  });
  