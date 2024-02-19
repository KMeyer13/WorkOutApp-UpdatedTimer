import { useContext } from "react";
import { Link } from "react-router-dom";
import WorkoutContext from "./WorkoutContext";
import BackButton from "./BackButton";

function Workout() {
  const workoutInfo = useContext(WorkoutContext);
  let newWorkout = [...workoutInfo.workout];

  const addExercise = (obj) => {
    if (obj.set > 1) {
      newWorkout.push(obj.exercise);
      workoutInfo.setWorkout(newWorkout);
      obj.set -= 1;
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
          <button className="with-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clip-rule="evenodd"
              />
            </svg>
            Add Excersise
          </button>
        </form>
      </div>
      <div>
        <Link to={"/settings"}>
          <BackButton />
        </Link>
      </div>
      <div>
        <h4>Workout:</h4>
        {newWorkout.map((exercise) => (
          <p>{exercise}</p>
        ))}
      </div>
    </div>
  );
}

export default Workout;
