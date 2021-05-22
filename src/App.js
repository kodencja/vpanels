import React, {
  useRef,
  useMemo,
  useEffect,
  useCallback,
  lazy,
  Suspense,
} from "react";
import Photo0 from "./img/salt-harvesting-1.jpg";
import Photo1 from "./img/boy_football-1.jpg";
import Photo2 from "./img/water-dream-1.jpg";
import Photo3 from "./img/athletes1.jpg";
import Photo4 from "./img/talahi-1.jpg";
import Photo5 from "./img/sea-jump-1.jpg";
import Photo6 from "./img/youtuber-1.jpg";
import "./App.css";
const Footer = lazy(() => import("./components/Footer"));

const AudioComp = lazy(() => import("./components/AudioComp"));

const panelTxt = [
  [Photo0, "Let's", "Follow", "The light"],
  [Photo1, "Find", "Your", "Way"],
  [Photo2, "Explore", "Dreams", "Are feasible"],
  [Photo3, "I Watch", "They", "Play?"],
  [Photo4, "To", "Know", "Yourself"],
  [Photo5, "Seize", "The", "Day"],
  [Photo6, "There's a", "Way", "Where there's a will"],
];

function App() {
  const panelRef = useRef([]);
  const openAudio = useRef();
  const closeAudio = useRef();

  useEffect(() => {
    const panelCurrent = panelRef.current;
    panelCurrent.forEach((panel) => {
      panel.addEventListener("click", (e) => {
        toggleOpen(panel, e);
      });
      panel.addEventListener("transitionend", (e) => {
        toggleActive(panel, e);
      });
    });
    return () => {
      panelCurrent.forEach((panel) => {
        panel.removeEventListener("click", toggleOpen);
        panel.removeEventListener("transitionend", toggleActive);
      });
    };
  }, []);

  const toggleOpen = useCallback((panel, e) => {
    console.log("toggleOpen Fn");
    panel.classList.toggle("open");
    if (panel.classList.contains("open")) {
      openAudio.current.play();
    } else {
      closeAudio.current.play();
    }
  }, []);

  const toggleActive = useCallback((p, e) => {
    if (e.propertyName.includes("flex")) {
      console.log("toggleActive Fn");
      p.classList.toggle("open-active");
    }
  }, []);

  const AddToPanelRef = useCallback(
    (el) => {
      if (el && !panelRef.current.includes(el)) {
        panelRef.current.push(el);
      }
    },
    [panelRef]
  );

  const panels = useMemo(() => {
    return panelTxt.map((panel, ind) => {
      return (
        <div
          className={"panel panel" + ind}
          key={ind}
          ref={AddToPanelRef}
          style={{ backgroundImage: "url(" + panel[0] + ")" }}
        >
          <p>{panel[1]}</p>
          <p>{panel[2]}</p>
          <p>{panel[3]}</p>
        </div>
      );
    });
  }, [panelTxt]);

  return (
    <React.Fragment>
      <div className="panels">{panels}</div>
      <Suspense fallback={<p>Loading...</p>}>
        <AudioComp refOpen={openAudio} refClose={closeAudio} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <Footer />
      </Suspense>
    </React.Fragment>
  );
}

export default App;
