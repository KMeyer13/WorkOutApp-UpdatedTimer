import ReactSlider from "react-slider";
import { useContext } from "react";
import WorkoutContext from "../context/WorkoutContext";
import { Link } from "react-router-dom";
import CreateWorkoutButton from "../components/buttons/CreateWorkoutButton";
import BackToTimerButton from "../components/buttons/BackToTimerButton";

function Settings() {
  const workoutInfo = useContext(WorkoutContext);

  return (
    <div>
      <h2>Time Intervals</h2>
      <div style={{ textAlign: "left" }}>
        <label>Work: {workoutInfo.workSeconds}</label>
        <ReactSlider
          className="slider-red"
          thumbClassName="thumb-red"
          trackClassName="track"
          value={workoutInfo.workSeconds}
          onChange={(newValue) => workoutInfo.setWorkSeconds(newValue)}
          min={1}
          max={120}
        />
        <label>Rest: {workoutInfo.restSeconds}</label>
        <ReactSlider
          className="slider-green"
          thumbClassName="thumb-green"
          trackClassName="track"
          value={workoutInfo.restSeconds}
          onChange={(newValue) => {
            workoutInfo.setRestSeconds(newValue);
          }}
          min={1}
          max={120}
        />
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to={"/workout"}>
            <CreateWorkoutButton />
          </Link>
          <Link to={"/"}>
            <BackToTimerButton />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Settings;
