// js/math.js
document.addEventListener("DOMContentLoaded", () => {
  const saveButtons = document.querySelectorAll(".save-btn");
  const noteList = document.getElementById("note-list");

  // --- Load existing notes on page load ---
  renderNotes();

  // --- Save note when button clicked ---
  saveButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.dataset.title || "Untitled";
      const formula = btn.parentElement.querySelector(".formula")?.textContent.trim() || "";
      const content = btn.parentElement.querySelector("p")?.textContent.trim() || "";

      const note = {
        title,
        formula,
        content,
        savedAt: new Date().toLocaleString()
      };

      Storage.add(note);
      renderNotes();
    });
  });

  // --- Render saved notes ---
  function renderNotes() {
    const notes = Storage.load();
    noteList.innerHTML = "";

    if (notes.length === 0) {
      noteList.innerHTML = "<li class='muted'>No saved notes yet.</li>";
      return;
    }

    notes.forEach(n => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${n.title}</strong><br>
        <div class="muted">${n.content}</div>
        <pre class="formula">${n.formula}</pre>
        <button class="remove-btn" data-title="${n.title}">Remove</button>
        <div class="muted">Saved: ${n.savedAt}</div>
      `;
      noteList.appendChild(li);
    });

    // attach remove events
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.onclick = () => {
        Storage.remove(btn.dataset.title);
        renderNotes();
      };
    });
  }
});
