-- Create the table
CREATE TABLE Workouts (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Title VARCHAR(255),
    Workout VARCHAR(5000)
);

-- Insert the workout
INSERT INTO Workouts (Title, Workout)
VALUES (
    'Full Body',
    'Chest Press, Shark Crunches, Rear Delt Fly, Rotational Curls, Pause Squats, Shoulder Press, Jump Rope, Chest Fly, Plank, Calf Raises, Bent Over Row, Lateral Raises, Hammer Curls, Sumo Squats, Dips, Toe Taps, Chest Press, Shark Crunches, Rear Delt Fly, Rotational Curls, Pause Squats, Shoulder Press, Jump Rope, Chest Fly, Plank, Calf Raises, Bent Over Row, Lateral Raises, Hammer Curls, Sumo Squats, Dips, Toe Taps'
);

INSERT INTO Workout (Title, Workout)
VALUES (
    'Chest Workout',
    'Chest Fly, In and Out to Chest, Crunches, Standing Fly, Incline Press, Sumo Squats, Chest Press, Chest Press Fly Combo, Jog in Place, Thruster Hold Press, Push Ups, Jump Rope'
)