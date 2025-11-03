// js/storage.js
const Storage = {
  key: "mysite_math_notes",

  // Save array of notes to LocalStorage
  save(notes) {
    localStorage.setItem(this.key, JSON.stringify(notes));
  },

  // Load notes from LocalStorage (returns array)
  load() {
    const raw = localStorage.getItem(this.key);
    try {
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  // Add one note
  add(note) {
    const notes = this.load();
    notes.unshift(note);
    this.save(notes);
  },

  // Remove one note by title
  remove(title) {
    const notes = this.load().filter(n => n.title !== title);
    this.save(notes);
  }
};
