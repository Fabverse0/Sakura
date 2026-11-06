import { useCallback, useState } from "react";
import { InkFilters } from "./components/InkFilters.jsx";
import { ShojiDoors } from "./components/ShojiDoors.jsx";
import { sections } from "./data/sections.js";
import { useActiveSection } from "./hooks/useActiveSection.js";
import { useGuidedRoute } from "./hooks/useGuidedRoute.js";
import { usePauseTimer } from "./hooks/usePauseTimer.js";
import { useViewTransition } from "./hooks/useViewTransition.js";
import { Finder } from "./sections/Finder.jsx";
import { GuidedRoute } from "./sections/GuidedRoute.jsx";
import { Haiku } from "./sections/Haiku.jsx";
import { HeroComp } from "./sections/HeroComp.jsx";
import { Journal } from "./sections/Journal.jsx";
import { Lens } from "./sections/Lens.jsx";
import { NavPanel } from "./sections/NavPanel.jsx";
import { Palette } from "./sections/Palette.jsx";
import { PanoramaDetails } from "./sections/PanoramaDetails.jsx";
import { PauseExperience } from "./sections/PauseExperience.jsx";
import { ScrollBeam } from "./sections/ScrollBeam.jsx";
import { Seasons } from "./sections/Seasons.jsx";
import { SiteFooter } from "./sections/SiteFooter.jsx";
import { SumiCanvas } from "./sections/SumiCanvas.jsx";

const sectionIds = sections.map((section) => section.id);

/**
 * Composition of the engawa walk. Shared state: the panorama focus (driven by
 * the rail, cards, haiku and route), the pause timer and the Ruang panel.
 */
export default function App() {
  const [activeView, setActiveView] = useState("overview");
  const [isRoomsOpen, setIsRoomsOpen] = useState(false);
  const transition = useViewTransition();
  const changeView = useCallback(
    (viewId) => transition(() => setActiveView(viewId), ["focus"]),
    [transition],
  );
  const route = useGuidedRoute(changeView);
  const pause = usePauseTimer();
  const activeSection = useActiveSection(sectionIds);
  const openRooms = useCallback(() => setIsRoomsOpen(true), []);

  function selectView(viewId, returnToPanorama = false) {
    changeView(viewId);
    route.reset();
    if (returnToPanorama) {
      document.getElementById("panorama")?.scrollIntoView({ block: "start" });
    }
  }

  return (
    <>
      <a className="skip-link" href="#panorama">
        Lewati ke konten utama
      </a>
      <InkFilters />
      <ShojiDoors />
      <NavPanel
        isOpen={isRoomsOpen}
        onClose={() => setIsRoomsOpen(false)}
        activeId={activeSection}
      />
      <ScrollBeam activeId={activeSection} onOpenRooms={openRooms} />

      <main id="top">
        <HeroComp activeView={activeView} onSelectView={selectView} onOpenRooms={openRooms} />
        <PanoramaDetails activeView={activeView} onSelectView={selectView} />
        <Lens />
        <Finder />
        <Haiku activeView={activeView} onSelectView={selectView} />
        <GuidedRoute route={route} />
        <Seasons />
        <Palette />
        <PauseExperience pause={pause} />
        <Journal activeView={activeView} />
        <SumiCanvas />
      </main>

      <SiteFooter />
    </>
  );
}
