import { useCallback, useEffect, useMemo, useState } from "react";
import { InkFilters } from "./components/InkFilters.jsx";
import { ShojiDoors } from "./components/ShojiDoors.jsx";
import { sections } from "./data/sections.js";
import { useActiveSection } from "./hooks/useActiveSection.js";
import { useGuidedRoute } from "./hooks/useGuidedRoute.js";
import { useAmbience } from "./hooks/useAmbience.js";
import { useHanko } from "./hooks/useHanko.js";
import { useShortcuts } from "./hooks/useShortcuts.js";
import { useJournal } from "./hooks/useJournal.js";
import { useNightMode } from "./hooks/useNightMode.js";
import { usePauseTimer } from "./hooks/usePauseTimer.js";
import { useViewTransition } from "./hooks/useViewTransition.js";
import { Finder } from "./sections/Finder.jsx";
import { GuidedRoute } from "./sections/GuidedRoute.jsx";
import { HankoBoard } from "./sections/HankoBoard.jsx";
import { Haiku } from "./sections/Haiku.jsx";
import { HeroComp } from "./sections/HeroComp.jsx";
import { Journal } from "./sections/Journal.jsx";
import { Lens } from "./sections/Lens.jsx";
import { NavPanel } from "./sections/NavPanel.jsx";
import { Palette } from "./sections/Palette.jsx";
import { PanoramaDetails } from "./sections/PanoramaDetails.jsx";
import { PauseExperience } from "./sections/PauseExperience.jsx";
import { BackToTop } from "./components/BackToTop.jsx";
import { ResumeNotice } from "./components/ResumeNotice.jsx";
import { useContrast } from "./hooks/useContrast.js";
import { useResumePosition } from "./hooks/useResumePosition.js";
import { RoomDots } from "./components/RoomDots.jsx";
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
  const [seenViews, setSeenViews] = useState(() => new Set());
  const transition = useViewTransition();
  const changeView = useCallback(
    (viewId) => transition(() => setActiveView(viewId), ["focus"]),
    [transition],
  );
  const route = useGuidedRoute(changeView);
  const pause = usePauseTimer();
  const activeSection = useActiveSection(sectionIds);
  const resume = useResumePosition(activeSection);
  const contrast = useContrast();
  const journal = useJournal();
  const hanko = useHanko();
  const night = useNightMode();
  const shortcutActions = useMemo(
    () => ({ __night: () => night.toggle(), __help: () => setIsRoomsOpen(true) }),
    [night],
  );
  useShortcuts(shortcutActions);
  const sound = useAmbience(night.isNight);
  const openRooms = useCallback(() => setIsRoomsOpen(true), []);

  useEffect(() => {
    hanko.award("buka");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function selectView(viewId, returnToPanorama = false) {
    changeView(viewId);
    if (!seenViews.has(viewId)) {
      const next = new Set(seenViews).add(viewId);
      setSeenViews(next);
      if (next.size >= 3) hanko.award("fokus");
    }
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
        contrast={contrast}
      />
      <RoomDots activeId={activeSection} />
      <ResumeNotice target={resume.target} />
      <ScrollBeam
        activeId={activeSection}
        onOpenRooms={openRooms}
        isNight={night.isNight}
        onToggleNight={night.toggle}
        sound={sound}
        contrast={contrast}
      />

      <main id="top">
        <HeroComp
          activeView={activeView}
          onSelectView={selectView}
          onOpenRooms={openRooms}
          isNight={night.isNight}
        />
        <PanoramaDetails activeView={activeView} onSelectView={selectView} />
        <Lens onUse={() => hanko.award("lensa")} />
        <Finder onComplete={() => hanko.award("temukan")} />
        <Haiku
          activeView={activeView}
          onSelectView={selectView}
          onSavePoem={(text) => {
            journal.add(text, "umum");
            hanko.award("haiku");
          }}
        />
        <GuidedRoute route={route} />
        <Seasons onSeason={(count) => count >= 4 && hanko.award("musim")} />
        <Palette />
        <PauseExperience pause={pause} onComplete={() => hanko.award("napas")} />
        <Journal
          activeView={activeView}
          journal={journal}
          onNote={() => hanko.award("catatan")}
        />
        <SumiCanvas onSave={() => hanko.award("tinta")} />
        <HankoBoard earned={hanko.earned} />
      </main>

      <SiteFooter />
      <BackToTop />
    </>
  );
}
