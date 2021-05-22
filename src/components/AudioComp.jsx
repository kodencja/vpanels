import React from "react";
import AudioOpen from "../audio/open.mp3";
import AudioClose from "../audio/close.mp3";

function AudioComp(props) {
  console.log("AudioComp rendered!;");
  return (
    <div className="audio">
      <audio src={AudioOpen} ref={props.refOpen}></audio>
      <audio src={AudioClose} ref={props.refClose}></audio>
    </div>
  );
}

export default React.memo(AudioComp);
