document.addEventListener("DOMContentLoaded", () => {
  const profiles = document.querySelectorAll(".profile");

  profiles.forEach((profile) => {
    profile.addEventListener("click", () => {
      // Cierra todos los demás perfiles
      profiles.forEach((p) => {
        if (p !== profile) {
          p.querySelector(".profile-text").classList.remove("visible");
          p.querySelector(".profile-text").classList.add("hidden");
          p.querySelector(".profile-video").classList.remove("visible");
          p.querySelector(".profile-video").classList.add("hidden");
        }
      });

      // Alterna el perfil actual
      const text = profile.querySelector(".profile-text");
      const video = profile.querySelector(".profile-video");
      const isVisible = text.classList.contains("visible");

      if (isVisible) {
        text.classList.remove("visible");
        text.classList.add("hidden");
        video.classList.remove("visible");
        video.classList.add("hidden");
      } else {
        text.classList.remove("hidden");
        text.classList.add("visible");
        video.classList.remove("hidden");
        video.classList.add("visible");
      }
    });
  });
});
