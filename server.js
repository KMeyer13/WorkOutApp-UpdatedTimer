import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";


// How to run
// to start server run node server.js which will start the node server on port 5174
// This will also rerun the insert statements ever time



const db = new sqlite3.Database("./data.db");
// // Create the table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS Workouts (
  Id INTEGER PRIMARY KEY,
  Title TEXT,
  Workout TEXT
)`);

// Insert the workout (optional, only once)
// db.run(`INSERT INTO Workouts (Title, Workout) VALUES (?, ?)`, [
//   "Full Body",
//   "Chest Press, Shark Crunches, Rear Delt Fly, Rotational Curls, Pause Squats, Shoulder Press, Jump Rope, Chest Fly, Plank, Calf Raises, Bent Over Row, Lateral Raises, Hammer Curls, Sumo Squats, Dips, Toe Taps, Chest Press, Shark Crunches, Rear Delt Fly, Rotational Curls, Pause Squats, Shoulder Press, Jump Rope, Chest Fly, Plank, Calf Raises, Bent Over Row, Lateral Raises, Hammer Curls, Sumo Squats, Dips, Toe Taps",
// ]);
db.run(`INSERT INTO Workouts (Title, Workout) VALUES (?, ?)`, [
  "Chest Workout",
  "Chest Fly, In and Out to Chest, Crunches, Standing Fly, Incline Press, Sumo Squats, Chest Press, Chest Press Fly Combo, Jog in Place, Thruster Hold Press, Push Ups, Jump Rope",
]);

const app = express();
const port = 5174;

// ✅ Enable CORS for all routes
app.use(cors());

// Example route
app.get("/workouts", (req, res) => {
  db.all("SELECT * FROM Workouts", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
