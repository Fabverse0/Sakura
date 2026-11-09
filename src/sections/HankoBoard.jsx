import { hankoList } from "../data/hanko.js";
import { hasHanko, progress } from "../lib/hanko.js";
import { sectionHref } from "../data/sections.js";

/**
 * Koleksi cap: a scroll of square seals. Earned stamps are pressed in maple
 * red; the rest show how to earn them and link to their room.
 */
export function HankoBoard({ earned }) {
  const { count, total } = progress(earned);

  return (
    <section className="room room--paper hanko" id="koleksi" aria-labelledby="hanko-title">
      <div className="room__inner">
        <div className="room__head">
          <h2 className="room__title" id="hanko-title">
            Koleksi cap
          </h2>
          <p className="room__lead">
            Setiap ruang menyimpan satu cap. Cap tersimpan di peramban ini, jadi koleksimu tetap ada
            saat kamu kembali.
          </p>
        </div>

        <p className="hanko__progress" role="status" aria-live="polite">
          <span className="hanko__count">{count}</span> dari {total} cap terkumpul
        </p>

        <ul className="hanko__grid">
          {hankoList.map((item, index) => {
            const got = hasHanko(earned, item.id);
            return (
              <li className="hanko__cell" key={item.id} data-earned={got} style={{ "--i": index }}>
                <span className="hanko__seal" aria-hidden="true">
                  {got ? item.glyph : ""}
                </span>
                <span className="hanko__name">{item.name}</span>
                <span className="hanko__how">
                  {got ? "Sudah kamu dapatkan." : item.how}{" "}
                  {!got && (
                    <a className="hanko__link" href={sectionHref(item.room)}>
                      Menuju ruangnya
                    </a>
                  )}
                </span>
                <span className="visually-hidden">{got ? "Terkumpul" : "Belum terkumpul"}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
