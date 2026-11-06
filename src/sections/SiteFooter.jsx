import topTimber from "../../assets/plates/top-charred-timber.png";
import { Icon } from "../components/Icon.jsx";
import { sectionHref, sections } from "../data/sections.js";

/**
 * Timber footer: every room once more, a way back to the panorama and a
 * short colophon.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer" style={{ backgroundImage: `url(${topTimber})` }}>
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__wordmark">SAKURA</p>
          <p className="site-footer__line">Satu lanskap, banyak cara memandang.</p>
        </div>

        <nav className="site-footer__nav" aria-label="Semua ruang di halaman">
          <ul className="site-footer__list">
            {sections.map((section) => (
              <li key={section.id}>
                <a className="site-footer__link" href={sectionHref(section.id)}>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="site-footer__base">
        <p className="site-footer__colophon">
          Ilustrasi lanskap disediakan oleh pemilik proyek. Huruf: Cormorant Garamond dan Cantata
          One. Dibangun dengan React dan Vite. Semua sajak, warna, dan tafsir musim adalah bacaan
          atas lukisan yang sama, bukan gambaran tempat nyata.
        </p>
        <a className="site-footer__top" href="#top">
          <Icon name="arrow-up" size={18} />
          Kembali ke panorama
        </a>
      </div>
    </footer>
  );
}
