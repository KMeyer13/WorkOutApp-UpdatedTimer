import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timer from "./Timer";
import Settings from "./Settings";
import WorkoutContext from "./WorkoutContext";
import { useState } from "react";

const App = () => {
  const [workSeconds, setWorkSeconds] = useState(45);
  const [breakSeconds, setBreakSeconds] = useState(15);
  const workout = [
    "Chest Press",
    "Chest Press",
    "Chest Fly",
    "Chest Fly",
    "Jog In Place",
    "Jumping Jacks",
  ];

  return (
    <BrowserRouter>
      <WorkoutContext.Provider
        value={{
          workSeconds,
          breakSeconds,
          setWorkSeconds,
          setBreakSeconds,
          workout,
        }}
      >
        <main>
          <h1>Lets Workout!</h1>
          <div>
            <Routes>
              <Route path="/" element={<Timer />} />
              <Route path="/settings" element={<Settings />} />
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
