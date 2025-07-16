import { useState, useRef } from "react";

function App() {
  const [form, setForm] = useState({
    nome: "",
    username: "",
    password: "",
    specializzazione: "",
    anniEsperienza: 0,
    descrizione: "",
  });

  const [pswValid, setPswValid] = useState(null);
  const [usernameValid, setUsernameValid] = useState(null);
  const [descValid, setDescValid] = useState(null);

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\"\\,.<>?/`~";
  const validChars = letters + numbers;

  const refDesc = useRef("");

  function validateUsername(username) {
    if (username.length < 6) return false;

    // Se username contiene almeno un carattere NON valido, ritorna false
    const hasInvalidChar = username
      .toLowerCase()
      .split("")
      .some((char) => !validChars.includes(char));

    return !hasInvalidChar;
  }

  function validatePassword(password) {
    if (!password.split("").some((char) => letters.includes(char)))
      return false;
    if (!password.split("").some((char) => numbers.includes(char)))
      return false;
    if (!password.split("").some((char) => symbols.includes(char)))
      return false;
    if (password.length < 8) return false;
    return true;
  }

  function validateDesc(descrizione) {
    const trimmed = descrizione.trim();
    if (trimmed.length < 100 || trimmed.length > 1000) return false;
    return true;
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const descrizioneValue = refDesc.current.value;
          const isDescValid = validateDesc(descrizioneValue);
          setDescValid(isDescValid);

          if (
            form.nome.trim() === "" ||
            form.username.trim() === "" ||
            form.password.trim() === "" ||
            form.specializzazione === "" ||
            descrizioneValue.trim() === "" ||
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
          onChange={(e) => {
            setForm({ ...form, nome: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => {
            setForm({ ...form, username: e.target.value });
            setUsernameValid(validateUsername(e.target.value));
          }}
        />
        {usernameValid ? (
          <p style={{ color: "green" }}>Username valido!</p>
        ) : (
          <p style={{ color: "red" }}>
            Username deve essere almeno 6 caratteri e solo lettere o numeri.
          </p>
        )}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => {
            setForm({ ...form, password: e.target.value }),
              setPswValid(validatePassword(e.target.value));
          }}
        />
        {pswValid ? (
          <p style={{ color: "green" }}>Password valida!</p>
        ) : (
          <p style={{ color: "red" }}>
            Password deve essere almeno 8 caratteri, 1 numero e 1 carattere
            speciale.
          </p>
        )}
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
        <textarea placeholder="descrizione" ref={refDesc} />
        {descValid === false && (
          <p style={{ color: "red" }}>
            Il testo deve essere più lungo di 100 caratteri e più corto di 1000
          </p>
        )}
        {descValid === true && <p style={{ color: "green" }}>Testo valido!</p>}
        <button type="submit">Invia</button>
      </form>
    </>
  );
}

export default App;

// Non tutti i campi del form necessitano di essere aggiornati a ogni carattere digitato. Alcuni di essi non influenzano direttamente l’interfaccia mentre l’utente li compila, quindi è possibile gestirli in modo più efficiente.
// Analizza il form: Identifica quali campi devono rimanere controllati e quali invece possono essere non controllati senza impattare l’esperienza utente.
// Converti i campi non controllati: Usa useRef() per gestirli e recuperare il loro valore solo al momento del submit.
// Assicurati che la validazione continui a funzionare: Anche se un campo non è controllato, deve comunque essere validato correttamente quando l’utente invia il form.
