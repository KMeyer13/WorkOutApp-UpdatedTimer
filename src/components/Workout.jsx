import { useContext } from "react";
import { Link } from "react-router-dom";
import WorkoutContext from "../context/WorkoutContext";
import AddExerciseButton from "./buttons/AddExerciseButton";
import BackToTimeIntervalButton from "./buttons/BackToTimeIntervalButton";

function Workout() {
  const workoutInfo = useContext(WorkoutContext);
  let newWorkout = [...workoutInfo.workout];

  const addExercise = (obj) => {
    if (obj.set >= 1) {
      newWorkout.push(obj.exercise);
      workoutInfo.setWorkout(newWorkout);
      obj.set -= 1;
      console.log(obj.set);
      addExercise(obj);
    }
    console.log(newWorkout);
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
          <label htmlFor="exercise">
            Exercise:
            <input id="exercise" name="exercise" placeholder="exercise" />
          </label>
          <label htmlFor="sets">
            Sets:
            <input id="sets" name="sets" placeholder="sets" />
          </label>
          <AddExerciseButton />
        </form>
      </div>
      <div>
        <Link to={"/settings"}>
          <BackToTimeIntervalButton />
        </Link>
      </div>
      <div>
        <h4>Workout Plan:</h4>
        {newWorkout.map((exercise) => (
          <p>{exercise}</p>
        ))}
      </div>
    </div>
  );
}

export default Workout;
