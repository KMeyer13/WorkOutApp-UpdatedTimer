import ReactSlider from "react-slider";
import { useContext } from "react";
import BackButton from "./BackButton";
import WorkoutContext from "./WorkoutContext";
import { Link } from "react-router-dom";
import CreateWorkoutButton from "./CreateWorkoutButton";

function Settings() {
  const workoutInfo = useContext(WorkoutContext);

  return (
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
      <label>Break: {workoutInfo.breakSeconds}</label>
      <ReactSlider
        className="slider-green"
        thumbClassName="thumb-green"
        trackClassName="track"
        value={workoutInfo.breakSeconds}
        onChange={(newValue) => {
          workoutInfo.setBreakSeconds(newValue);
        }}
        min={1}
        max={120}
      />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to={"/workout"}>
          <CreateWorkoutButton />
        </Link>
        <Link to={"/"}>
          <BackButton />
        </Link>
      </div>
    </div>
  );
}

export default Settings;
