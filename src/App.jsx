import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    nome: "",
    username: "",
    password: "",
    specializzazione: "",
    anniEsperienza: 0,
    descrizione: "",
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            form.nome.trim() === "" ||
            form.username.trim() === "" ||
            form.password.trim() === "" ||
            form.specializzazione === "" ||
            form.descrizione.trim() === "" ||
            Number(form.anniEsperienza) <= 0
          ) {
            alert("Compila tutti i campi correttamente!");
          }
          console.log("Form valido", form);
        }}
      >
        <input
          type="text"
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select
          name="specializzazione"
          id=""
          value={form.specializzazione}
          onChange={(e) =>
            setForm({ ...form, specializzazione: e.target.value })
          }
        >
          <option value="fullStack">Full Stack</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
        <input
          type="number"
          placeholder="Anni di esperienza"
          value={form.anniEsperienza}
          onChange={(e) => setForm({ ...form, anniEsperienza: e.target.value })}
        />
        <textarea
          placeholder="descrizione"
          value={form.descrizione}
          onChange={(e) => setForm({ ...form, descrizione: e.target.value })}
        />
        <button type="submit">Invia</button>
      </form>
    </>
  );
}

export default App;

// Crea un form di registrazione con i seguenti campi controllati (gestiti con useState):
// ✅ Nome completo (input di testo)
// ✅ Username (input di testo)
// ✅ Password (input di tipo password)
// ✅ Specializzazione (select con opzioni: "Full Stack", "Frontend", "Backend")
// ✅ Anni di esperienza (input di tipo number)
// ✅ Breve descrizione sullo sviluppatore (textarea)

// Aggiungi una validazione al submit, verificando che:
// Tutti i campi siano compilati
// L'input Anni di esperienza sia un numero positivo
// La Specializzazione sia selezionata

// Al submit, se il form è valido, stampa in console i dati.
