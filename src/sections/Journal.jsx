import { useId, useState } from "react";
import { Icon } from "../components/Icon.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import {
  addNote,
  createNote,
  formatNoteDate,
  isNoteList,
  journalKey,
  maxNoteLength,
  noteTags,
  validateNoteText,
} from "../lib/journal.js";

/**
 * Jurnal Pandang: private notes kept only in this browser.
 */
export function Journal({ activeView }) {
  const [notes, setNotes] = useLocalStorage(journalKey, [], isNoteList);
  const [text, setText] = useState("");
  const [tag, setTag] = useState(() =>
    noteTags.some((item) => item.id === activeView) ? activeView : "umum",
  );
  const [error, setError] = useState(null);
  const ids = useId();
  const remaining = maxNoteLength - text.length;

  function handleSubmit(event) {
    event.preventDefault();
    const problem = validateNoteText(text);
    if (problem) {
      setError(problem);
      return;
    }
    setNotes((current) => addNote(current, createNote(text, tag)));
    setText("");
    setError(null);
  }

  return (
    <section className="room room--ivory journal" id="jurnal" aria-labelledby="journal-title">
      <div className="room__inner">
        <div className="room__head">
          <h2 className="room__title" id="journal-title">
            Jurnal pandang
          </h2>
          <p className="room__lead">
            Tulis apa yang kamu lihat atau rasakan. Catatan hanya tersimpan di peramban ini dan
            tidak dikirim ke mana pun.
          </p>
        </div>

        <div className="journal__layout">
          <form className="journal__form" onSubmit={handleSubmit} noValidate>
            <label className="journal__label" htmlFor={`${ids}-text`}>
              Catatan
            </label>
            <textarea
              className="journal__input"
              id={`${ids}-text`}
              rows={6}
              maxLength={maxNoteLength}
              value={text}
              placeholder="Misalnya: perahu itu seperti sedang menunggu seseorang."
              aria-describedby={`${ids}-count${error ? ` ${ids}-error` : ""}`}
              aria-invalid={error ? true : undefined}
              onChange={(event) => {
                setText(event.target.value);
                if (error) setError(null);
              }}
            />
            <div className="journal__meta">
              <span
                className="journal__count"
                id={`${ids}-count`}
                data-low={remaining <= 20}
              >
                {remaining} karakter tersisa
              </span>
              {error && (
                <span className="journal__error" id={`${ids}-error`} role="alert">
                  {error}
                </span>
              )}
            </div>

            <fieldset className="journal__tags">
              <legend className="journal__label">Tentang</legend>
              {noteTags.map((item) => (
                <label className="journal__tag" key={item.id}>
                  <input
                    type="radio"
                    name={`${ids}-tag`}
                    value={item.id}
                    checked={tag === item.id}
                    onChange={() => setTag(item.id)}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </fieldset>

            <button className="room-button journal__submit" type="submit">
              <Icon name="plus" size={18} />
              Simpan catatan
            </button>
          </form>

          <div className="journal__notes">
            <h3 className="journal__notes-title">
              Catatanmu <span className="journal__notes-count">{notes.length}</span>
            </h3>
            {notes.length === 0 ? (
              <p className="journal__empty">
                Belum ada catatan. Catatan pertamamu akan muncul di sini, seperti secarik kertas
                yang diselipkan di bingkai shoji.
              </p>
            ) : (
              <ol className="journal__list">
                {notes.map((note) => (
                  <li className="journal__slip" key={note.id}>
                    <p className="journal__text">{note.text}</p>
                    <p className="journal__info">
                      <span className="journal__tag-label">
                        {noteTags.find((item) => item.id === note.tag)?.label}
                      </span>
                      <time dateTime={new Date(note.createdAt).toISOString()}>
                        {formatNoteDate(note.createdAt)}
                      </time>
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
