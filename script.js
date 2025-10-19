// Mostrar fecha actual
document.getElementById("fecha").textContent =
  new Date().toLocaleString("es-CO");

// ----- Modal del banner -----
const modal = document.getElementById("modal");
const banner = document.getElementById("banner");
const closeModal = document.getElementById("closeModal");

banner.addEventListener("click", () => modal.classList.add("open"));
closeModal.addEventListener("click", () => modal.classList.remove("open"));

// ----- Descargar PDF -----
document.getElementById("downloadPdf").addEventListener("click", () => {
  const obj = document.querySelector(".pdf-frame object");
  const url = obj.getAttribute("data");
  const a = document.createElement("a");
  a.href = url;
  a.download = "Feria_empresarial_2025.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
});

// ----- Abrir PDF -----
document.getElementById("openPdfModal").addEventListener("click", () => {
  const obj = document.querySelector(".pdf-frame object");
  const url = obj.getAttribute("data");
  window.open(url, "_blank");
});

// ----- Controles del video -----
const iframe = document.getElementById("ytplayer");
function post(action) {
  iframe.contentWindow.postMessage(JSON.stringify(action), "*");
}

document.getElementById("play").addEventListener("click", () => {
  post({ event: "command", func: "playVideo", args: [] });
});

document.getElementById("pause").addEventListener("click", () => {
  post({ event: "command", func: "pauseVideo", args: [] });
});

let muted = false;
document.getElementById("mute").addEventListener("click", () => {
  muted = !muted;
  post({ event: "command", func: muted ? "mute" : "unMute", args: [] });
  document.getElementById("mute").textContent = muted
    ? "Activar sonido"
    : "Silenciar";
});

// ----- Modo teatro -----
document.getElementById("enterTheater").addEventListener("click", () => {
  const vp = document.getElementById("videoPlaceholder");
  vp.style.position = "fixed";
  vp.style.zIndex = 80;
  vp.style.left = "50%";
  vp.style.top = "50%";
  vp.style.transform = "translate(-50%, -50%)";
  vp.style.width = "85%";
  vp.style.height = "75%";
  const restore = (e) => {
    if (!vp.contains(e.target)) {
      vp.removeAttribute("style");
      document.removeEventListener("click", restore);
    }
  };
  document.addEventListener("click", restore);
});