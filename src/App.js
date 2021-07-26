import React, {
  useRef,
  useMemo,
  useEffect,
  useCallback,
  lazy,
  Suspense,
} from "react";
// import "./css/style.min.css";
import "./css/style.css";
import Photo0 from "./img/salt-harvesting-1.jpg";
import Photo1 from "./img/boy_football-1.jpg";
import Photo2 from "./img/water-dream-1.jpg";
import Photo3 from "./img/athletes1.jpg";
import Photo4 from "./img/talahi-1.jpg";
import Photo5 from "./img/jump1.jpg";
import Photo6 from "./img/youtuber-1.jpg";

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
  const allPanelsRef = useRef();
  const flexDirection = useRef();
  const panelRef = useRef([]);
  const openAudio = useRef();
  const closeAudio = useRef();
  // two arrays used for drawing without repeating
  const arrayDrawFrom = useRef(new Array(7));
  const arrayDrawTo = useRef([]);

  useEffect(() => {
    arrayDrawFrom.current = arrayDrawFrom.current
      .fill(0, 0)
      .map((el, ind) => ind);
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

  useEffect(() => {
// get value odf flex direction property of div 'panels'
const rowOrColumn = window.getComputedStyle(allPanelsRef.current).getPropertyValue("flex-direction");
// console.log(rowOrColumn);
flexDirection.current = rowOrColumn;

    const panelCurr = panelRef.current;

    // hide all panels at the beginning
    for (let i = 0; i < panelCurr.length; i++) {
      if(flexDirection.current === 'row'){
        panelCurr[i].classList.add("hide-down-row");
      } else {
        panelCurr[i].classList.add("hide-down-col");
      }

      // get random number for index
      const ind = randomWithoutRepeating(i);

      // show up all panels one by one
      setTimeout(() => {
        if(flexDirection.current === 'row'){
          panelCurr[ind].classList.add("show-up-row");
        } else {
          panelCurr[ind].classList.add("show-up-col");
        }

      }, 400 * (i + 1));

      // then rotate all panels one by one
      setTimeout(()=>{
        setTimeout(()=>{
          if(flexDirection.current === 'row'){
            panelCurr[i].classList.add("rotateY");
          } else {
            panelCurr[i].classList.add("rotateX");
          }          
        }, 150 * i);
      }, 4250);

    }
  }, []);


  // get random number that equals one of the index of all panels (there are 7 panels so index from 0 to 6)
  const randomWithoutRepeating = (i) => {
    // console.log("randomWithoutRepeating Fn");
    const arrLength = arrayDrawFrom.current.length;
    const arrFrom = arrayDrawFrom.current;
    const arrTo = arrayDrawTo.current;
    const randomIndex = Math.floor(Math.random() * arrLength);
    arrTo[i] = arrFrom[randomIndex];
    arrFrom.splice(randomIndex, 1, arrFrom[arrLength - 1]);
    arrFrom.splice(-1, 1);
    return arrTo[i];
  };

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
      // console.log(p);
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
      <div className="panels" ref={allPanelsRef}>{panels}</div>
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
