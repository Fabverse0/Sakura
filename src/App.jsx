import panoramaArt from "../assets/plates/panorama-art.png";
import topTimber from "../assets/plates/top-charred-timber.png";
import railTimber from "../assets/plates/view-rail-timber.png";
import shojiPaper from "../assets/plates/shoji-paper.png";
import shojiLintel from "../assets/plates/shoji-lintel.png";
import shojiPost from "../assets/plates/shoji-post.png";

export default function App() {
  return (
    <main className="comp-frame" aria-hidden="true">
      <div
        className="top-beam"
        style={{ backgroundImage: "url(" + topTimber + ")" }}
      />

      <img className="panorama-art" src={panoramaArt} alt="" />

      <div
        className="view-rail"
        style={{ backgroundImage: "url(" + railTimber + ")" }}
      />

      <section
        className="shoji-wall"
        style={{ backgroundImage: "url(" + shojiPaper + ")" }}
      >
        <div
          className="shoji-lintel"
          style={{ backgroundImage: "url(" + shojiLintel + ")" }}
        />
        <div
          className="shoji-post shoji-post--left"
          style={{ backgroundImage: "url(" + shojiPost + ")" }}
        />
        <div
          className="shoji-post shoji-post--right"
          style={{ backgroundImage: "url(" + shojiPost + ")" }}
        />
      </section>
    </main>
  );
}