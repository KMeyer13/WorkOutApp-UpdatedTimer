import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timer from "./components/Timer";
import Settings from "./components/Settings";
import WorkoutContext from "./context/WorkoutContext";
import { useState } from "react";
import Workout from "./components/Workout";

const App = () => {
  const [workSeconds, setWorkSeconds] = useState(45);
  const [restSeconds, setRestSeconds] = useState(15);
  const [workout, setWorkout] = useState([
    "Chest Press",
    "Chest Press",
    "Chest Fly",
    "Chest Fly",
    "Jog In Place",
    "Jumping Jacks",
  ]);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(
    workout.length * workSeconds + workout.length * restSeconds
  );
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
