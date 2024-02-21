import { useContext } from "react";
import { Link } from "react-router-dom";
import WorkoutContext from "../context/WorkoutContext";
import AddExerciseButton from "../components/buttons/AddExerciseButton";
import BackToTimeIntervalButton from "../components/buttons/BackToTimeIntervalButton";

function Workout() {
  const workoutInfo = useContext(WorkoutContext);
  let newWorkout = [...workoutInfo.workout];

  const addExercise = (obj) => {
    if (obj.set >= 1) {
      newWorkout.push(obj.exercise);
      workoutInfo.setWorkout(newWorkout);
      obj.set -= 1;
      addExercise(obj);
      workoutInfo.setTotalWorkoutTime(
        newWorkout.length * workoutInfo.workSeconds +
          newWorkout.length * workoutInfo.restSeconds
      );
    }
  };

  return (
    <div>
      <h2>Lets Create Your Workout!</h2>
      <div className="WorkoutForm">
        <form
          id="WorkoutForm"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const obj = {
              exercise: formData.get("exercise") ?? "",
              set: formData.get("sets") ?? "",
            };
            addExercise(obj);
            document.getElementById("WorkoutForm").reset();
          }}
        >
          <label className="heading" htmlFor="exercise">
            Exercise:
            <div className="workoutInput">
              <input
                id="exercise"
                name="exercise"
                placeholder="What exercise?"
              />
            </div>
          </label>
          <label className="heading" htmlFor="sets">
            Sets:
            <div className="workoutInput">
              <input id="sets" name="sets" placeholder="How many sets?" />
            </div>
          </label>
          <AddExerciseButton />
        </form>
      </div>
      <div>
        <Link to={"/settings"}>
          <BackToTimeIntervalButton />
        </Link>
      </div>
      <div className="workoutPlan">
        <h4>Workout Plan:</h4>
        <h4>
          Total Workout Time : {Math.floor(workoutInfo.totalWorkoutTime / 60)}:
          {workoutInfo.totalWorkoutTime % 60 < 10
            ? `0${workoutInfo.totalWorkoutTime % 60}`
            : workoutInfo.totalWorkoutTime % 60}
        </h4>
        {newWorkout.map((exercise) => (
          <p>{exercise}</p>
        ))}
      </div>
    </div>
  );
}

export default Workout;
