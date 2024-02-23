import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "../components/buttons/PlayButton";
import PauseButton from "../components/buttons/PauseButton";
import workSound from "../sounds/Beep.mp3";
import restSound from "../sounds/Buzzer.mp3";
import startSound from "../sounds/Start.mp3";
import { useContext, useState, useRef, useEffect } from "react";
import { Howl } from "howler";
import SettingsButton from "../components/buttons/SettingsButton";
import { Link } from "react-router-dom";
import WorkoutContext from "../context/WorkoutContext";

const Timer = () => {
  const workoutInfo = useContext(WorkoutContext);
  const [mode, setMode] = useState("work");
  const [isPaused, setIsPaused] = useState(true);
  const [indexToUse, setIndexToUse] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(workoutInfo.workSeconds);
  const [timeleft, setTimeLeft] = useState(workoutInfo.totalWorkoutTime);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const indexRef = useRef(indexToUse);
  const timeLeftRef = useRef(timeleft);

  const beep = new Howl({ src: [workSound], html5: true });
  const buzzer = new Howl({ src: [restSound], html5: true });
  const start = new Howl({ src: [startSound], html5: true });

  function initTimer() {
    setSecondsLeft(workoutInfo.workSeconds);
  }

  function switchMode() {
    const nextMode = modeRef.current === "work" ? "rest" : "work";
    modeRef.current === "work" ? playBeep() : playBuzzer();
    setMode(nextMode);
    modeRef.current = nextMode;

    const nextSeconds =
      nextMode === "work" ? workoutInfo.workSeconds : workoutInfo.restSeconds;
    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  function tick() {
    setSecondsLeft(secondsLeftRef.current--);
    timeLeftRef.current == 0
      ? setTimeLeft(0)
      : setTimeLeft(timeLeftRef.current--);
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
      if (
        workoutInfo.workout.length == indexRef.current &&
        modeRef.current == "work"
      ) {
        tick();
        setSecondsLeft(0);
        setIsPaused(true);
        isPausedRef.current = true;
        playBeep();
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
    mode === "work" ? workoutInfo.workSeconds : workoutInfo.restSeconds;

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
          : mode === "rest"
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
        <h3>
          Total Time Left : {Math.floor(timeleft / 60)}:
          {timeleft % 60 < 10 ? `0${timeleft % 60}` : timeleft % 60}
        </h3>
      </div>
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
