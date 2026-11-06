import { useState } from "react";
import { PanoramaDetails } from "./sections/PanoramaDetails.jsx";
import { GuidedRoute } from "./sections/GuidedRoute.jsx";
import { PauseExperience } from "./sections/PauseExperience.jsx";
import { HeroComp } from "./sections/HeroComp.jsx";
import { useGuidedRoute } from "./hooks/useGuidedRoute.js";
import { usePauseTimer } from "./hooks/usePauseTimer.js";

export default function App() {
  const [activeView, setActiveView] = useState("overview");
  const route = useGuidedRoute(setActiveView);

  function selectView(viewId, returnToPanorama = false) {
    setActiveView(viewId);
    route.reset();

    if (returnToPanorama) {
      document.getElementById("panorama")?.scrollIntoView({ block: "start" });
    }
  }

  const pause = usePauseTimer();

  return (
    <>
      <a className="skip-link" href="#top">
        Lewati ke konten utama
      </a>
      <HeroComp activeView={activeView} onSelectView={selectView} />

      <PanoramaDetails activeView={activeView} onSelectView={selectView} />

      <GuidedRoute route={route} />

      <PauseExperience pause={pause} />
    </>
  );
}
