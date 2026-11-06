import { useCallback, useState } from "react";
import { useViewTransition } from "./hooks/useViewTransition.js";
import { sections } from "./data/sections.js";
import { useActiveSection } from "./hooks/useActiveSection.js";
import { Lens } from "./sections/Lens.jsx";
import { NavPanel } from "./sections/NavPanel.jsx";
import { ScrollBeam } from "./sections/ScrollBeam.jsx";
import { InkFilters } from "./components/InkFilters.jsx";
import { ShojiDoors } from "./components/ShojiDoors.jsx";
import { PanoramaDetails } from "./sections/PanoramaDetails.jsx";
import { GuidedRoute } from "./sections/GuidedRoute.jsx";
import { PauseExperience } from "./sections/PauseExperience.jsx";
import { HeroComp } from "./sections/HeroComp.jsx";
import { useGuidedRoute } from "./hooks/useGuidedRoute.js";
import { usePauseTimer } from "./hooks/usePauseTimer.js";

const sectionIds = sections.map((section) => section.id);

export default function App() {
  const [activeView, setActiveView] = useState("overview");
  const transition = useViewTransition();
  const changeView = useCallback(
    (viewId) => transition(() => setActiveView(viewId), ["focus"]),
    [transition],
  );
  const route = useGuidedRoute(changeView);

  function selectView(viewId, returnToPanorama = false) {
    changeView(viewId);
    route.reset();

    if (returnToPanorama) {
      document.getElementById("panorama")?.scrollIntoView({ block: "start" });
    }
  }

  const pause = usePauseTimer();
  const activeSection = useActiveSection(sectionIds);
  const [isRoomsOpen, setIsRoomsOpen] = useState(false);

  return (
    <>
      <a className="skip-link" href="#top">
        Lewati ke konten utama
      </a>
      <InkFilters />
      <ShojiDoors />
      <NavPanel
        isOpen={isRoomsOpen}
        onClose={() => setIsRoomsOpen(false)}
        activeId={activeSection}
      />
      <ScrollBeam activeId={activeSection} onOpenRooms={() => setIsRoomsOpen(true)} />
      <HeroComp
        activeView={activeView}
        onSelectView={selectView}
        onOpenRooms={() => setIsRoomsOpen(true)}
      />

      <PanoramaDetails activeView={activeView} onSelectView={selectView} />

      <Lens />

      <GuidedRoute route={route} />

      <PauseExperience pause={pause} />
    </>
  );
}
