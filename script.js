// Año automático en el pie de página
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Parallax muy sutil de las notas en escritorio para que la escena tenga vida.
const landing = document.querySelector(".landing");
const notes = document.querySelectorAll(".note");
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const reduceMotion = motionPreference.matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

if (landing) {
  let tapNoteIndex = 0;
  const tapNoteSymbols = ["♫", "♪", "♬"];

  landing.addEventListener("pointerdown", (event) => {
    if (motionPreference.matches || !event.isPrimary || event.button !== 0) return;

    const bounds = landing.getBoundingClientRect();
    const tapNote = document.createElement("span");
    tapNote.className = "tap-note";
    tapNote.setAttribute("aria-hidden", "true");
    tapNote.textContent = tapNoteSymbols[tapNoteIndex % tapNoteSymbols.length];
    tapNoteIndex += 1;
    tapNote.style.left = `${event.clientX - bounds.left}px`;
    tapNote.style.top = `${event.clientY - bounds.top}px`;
    landing.append(tapNote);
    tapNote.addEventListener("animationend", () => tapNote.remove(), { once: true });
    window.setTimeout(() => tapNote.remove(), 1200);
  });
}

if (landing && finePointer && !reduceMotion) {
  landing.addEventListener("pointermove", (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    notes.forEach((note, index) => {
      const depth = (index % 3 + 1) * 4;
      note.style.setProperty("--parallax-x", `${x * depth}px`);
      note.style.setProperty("--parallax-y", `${y * depth}px`);
      note.style.marginLeft = `calc(var(--parallax-x, 0px))`;
      note.style.marginTop = `calc(var(--parallax-y, 0px))`;
    });
  });
  landing.addEventListener("pointerleave", () => {
    notes.forEach((note) => {
      note.style.marginLeft = "0";
      note.style.marginTop = "0";
    });
  });
}
