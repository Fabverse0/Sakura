import { useState } from "react";
import { Icon } from "./Icon.jsx";
import { useToast } from "./Toast.jsx";
import { lineKeys, phrases } from "../data/phrases.js";
import { composePoem, cycle, phraseById, randomSelection } from "../lib/composer.js";

/**
 * Susun haiku: three columns of phrases (5-7-5). Visitors pick a phrase per
 * line, shuffle, and send the finished poem to their journal.
 */
export function HaikuComposer({ onSave }) {
  const [selection, setSelection] = useState({ first: "f1", second: "s1", third: "t1" });
  const { show } = useToast();
  const poem = composePoem(selection);

  function choose(key, id) {
    setSelection((current) => ({ ...current, [key]: id }));
  }

  return (
    <div className="composer">
      <h3 className="composer__title">Susun haiku sendiri</h3>
      <p className="composer__lead">
        Pilih satu frasa untuk tiap baris. Lima, tujuh, lima suku kata, semuanya tentang yang
        terlihat di lukisan.
      </p>

      <div className="composer__columns">
        {lineKeys.map((key, index) => (
          <fieldset className="composer__column" key={key}>
            <legend className="composer__legend">
              Baris {index + 1} <span className="composer__count">({index === 1 ? 7 : 5} suku kata)</span>
            </legend>
            {phrases[key].map((phrase) => (
              <label className="composer__phrase" key={phrase.id}>
                <input
                  type="radio"
                  name={`composer-${key}`}
                  value={phrase.id}
                  checked={selection[key] === phrase.id}
                  onChange={() => choose(key, phrase.id)}
                />
                <span>{phrase.text}</span>
              </label>
            ))}
            <span className="composer__spin">
              <button
                type="button"
                className="composer__step"
                onClick={() => choose(key, cycle(key, selection[key], -1))}
              >
                <Icon name="chevron-left" size={16} />
                <span className="visually-hidden">Frasa sebelumnya, baris {index + 1}</span>
              </button>
              <button
                type="button"
                className="composer__step"
                onClick={() => choose(key, cycle(key, selection[key], 1))}
              >
                <Icon name="chevron-right" size={16} />
                <span className="visually-hidden">Frasa berikutnya, baris {index + 1}</span>
              </button>
            </span>
          </fieldset>
        ))}
      </div>

      <figure className="composer__preview">
        <blockquote className="composer__poem" aria-live="polite">
          {poem.map((line) => (
            <span className="composer__line" key={line}>
              {line}
            </span>
          ))}
        </blockquote>
        <div className="composer__actions">
          <button
            className="room-button room-button--quiet"
            type="button"
            onClick={() => setSelection(randomSelection())}
          >
            Acak
          </button>
          <button
            className="room-button"
            type="button"
            onClick={() => {
              onSave?.(poem.join(" / "));
              show("Haikumu disimpan ke jurnal.");
            }}
          >
            <Icon name="plus" size={18} />
            Simpan ke jurnal
          </button>
        </div>
        <figcaption className="visually-hidden">
          Pratinjau haiku: {poem.map((line, i) => phraseById(lineKeys[i], selection[lineKeys[i]])?.text).join(", ")}
        </figcaption>
      </figure>
    </div>
  );
}
