import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import workSound from "./Sounds/beep.mp3";
import restSound from "./Sounds/buzzer.mp3";
import startSound from "./Sounds/start.mp3";
import { useContext, useState, useRef, useEffect } from "react";
import { Howl } from "howler";
import SettingsButton from "./SettingsButton";
import { Link } from "react-router-dom";
import WorkoutContext from "./WorkoutContext";

const Timer = () => {
  const workoutInfo = useContext(WorkoutContext);
  const [mode, setMode] = useState("work");
  const [isPaused, setIsPaused] = useState(true);
  const [indexToUse, setIndexToUse] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(workoutInfo.workSeconds);
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const indexRef = useRef(indexToUse);

  const beep = new Howl({ src: [workSound] });
  const buzzer = new Howl({ src: [restSound] });
  const start = new Howl({ src: [startSound] });

  function initTimer() {
    setSecondsLeft(workoutInfo.workSeconds);
  }

  function switchMode() {
    const nextMode = modeRef.current === "work" ? "break" : "work";
    modeRef.current === "work" ? playBeep() : playBuzzer();
    setMode(nextMode);
    modeRef.current = nextMode;

    const nextSeconds =
      nextMode === "work" ? workoutInfo.workSeconds : workoutInfo.breakSeconds;
    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  function tick() {
    setSecondsLeft(secondsLeftRef.current--);
  }

  function playBuzzer() {
    buzzer.play();
  }

  function playBeep() {
    beep.play();
  }

  function playStart() {
    start.play();
  }

  useEffect(() => {
    initTimer();
    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (workoutInfo.workout.length == indexRef.current) {
        setIsPaused(true);
        isPausedRef.current = true;
        return;
      }
      if (secondsLeftRef.current === 0) {
        if (modeRef.current === "work") {
          const nextIndex = indexRef.current + 1;
          setIndexToUse(nextIndex);
          indexRef.current = nextIndex;
        }
        return switchMode();
      }
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [workoutInfo]);

  const totalSeconds =
    mode === "work" ? workoutInfo.workSeconds : workoutInfo.breakSeconds;

  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  let seconds = secondsLeft;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div>
      <h2 className="exercise">
        {workoutInfo.workout.length > indexToUse
          ? mode === "work"
            ? workoutInfo.workout[indexToUse]
            : "Rest"
          : "Great Job!!"}
      </h2>
      <h3>
        {workoutInfo.workout[indexToUse] == undefined
          ? null
          : mode === "break"
          ? `(up next: ${workoutInfo.workout[indexToUse]})`
          : null}
      </h3>
      <CircularProgressbar
        value={percentage}
        text={`${seconds}`}
        styles={buildStyles({
          textColor: "white",
          pathColor: mode === "work" ? "red" : "green",
          trailColor: "grey",
        })}
      />
      <div>
        {isPaused ? (
          <PlayButton
            onClick={() => {
              playStart();
              setTimeout(() => {
                setIsPaused(false);
                isPausedRef.current = false;
              }, 3500);
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>
      <div className="settingsButton">
        <Link to={"/settings"}>
          <SettingsButton />
        </Link>
      </div>
    </div>
  );
};

export default Timer;
