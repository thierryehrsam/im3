const topBox = document.getElementById("topBox");
const bottomBox = document.getElementById("bottomBox");
const boxes = [topBox, bottomBox];

function setupBox(box, expandClass) {
    if (window.matchMedia("(max-width: 767px)").matches) return; // disable mobile

    let state = "closed";

    // Schließen-Button im Inneren finden
    const closeBtn = box.querySelector(".sidepanel__close");
    if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Klick geht nicht an Box weiter
            closeBox(box);
        });
    }

    // Öffnen nur, wenn auf die geschlossene Box oder das Label geklickt wird
    box.addEventListener("click", (e) => {
        // Wenn die Box offen ist oder auf internen Inhalt (Canvas, Button etc.) geklickt wurde → nichts tun
        if (box.classList.contains("open")) return;
        if (!e.target.classList.contains("side-box") && !e.target.classList.contains("side-box__label")) return;

        // andere Box schließen, falls offen
        const other = boxes.find(b => b !== box);
        if (other.classList.contains("open")) closeBox(other);

        // aktuelle Box öffnen
        openBox(box, expandClass);
    });

    // Animationen
    box.addEventListener("transitionend", (e) => {
        if (e.propertyName === "left" && box.classList.contains("open") && !box.classList.contains("expand-top") && !box.classList.contains("expand-bottom")) {
            box.classList.add(expandClass);
        } else if (e.propertyName === "height" && box.classList.contains("open")) {
            box.classList.add("show-text");
            state = "open";
        }
    });

    // Hilfsfunktionen
    function openBox(b, expandClass) {
        state = "moving";
        b.classList.add("open", "move");
    }

    function closeBox(b) {
        b.classList.remove("show-text", "expand-top", "expand-bottom");
        setTimeout(() => {
            b.classList.remove("move", "open");
            state = "closed";
        }, 10);
    }
}

setupBox(topBox, "expand-top");
setupBox(bottomBox, "expand-bottom");
