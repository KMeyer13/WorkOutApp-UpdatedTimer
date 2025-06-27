import React from "react";
import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timer from "./components/Timer";
import Settings from "./components/Settings";
import WorkoutContext from "./context/WorkoutContext";
import Workout from "./components/Workout";

const App = () => {
  const [workSeconds, setWorkSeconds] = useState(45);
  const [restSeconds, setRestSeconds] = useState(15);
  const [workout, setWorkout] = useState([
    "Chest Press",
    "Shark Crunches",
    "Rear Delt Fly",
    "Rotational CUrls",
    "Pause Squats",
    "Shoulder Press",
    "Jump Rope",
    "Chest Fly",
    "Plank",
    "Calf Raises",
    "Bent Over Row",
    "Lateral Raises",
    "Hammer Curls",
    "Sumo Squats",
    "Dips",
    "Toe Taps",
    "Chest Press",
    "Shark Crunches",
    "Rear Delt Fly",
    "Rotational CUrls",
    "Pause Squats",
    "Shoulder Press",
    "Jump Rope",
    "Chest Fly",
    "Plank",
    "Calf Raises",
    "Bent Over Row",
    "Lateral Raises",
    "Hammer Curls",
    "Sumo Squats",
    "Dips",
    "Toe Taps",
  ]);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(
    workout.length * workSeconds + workout.length * restSeconds
  );

  useEffect(() => {
    fetch("http://localhost:5174/workouts")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <BrowserRouter>
      <WorkoutContext.Provider
        value={{
          workSeconds,
          restSeconds,
          setWorkSeconds,
          setRestSeconds,
          workout,
          setWorkout,
          totalWorkoutTime,
          setTotalWorkoutTime,
        }}
      >
        <main>
          <h1>Lets Workout!</h1>
          <div>
            <Routes>
              <Route path="/" element={<Timer />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/workout" element={<Workout />} />
            </Routes>
          </div>
        </main>
      </WorkoutContext.Provider>
    </BrowserRouter>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
