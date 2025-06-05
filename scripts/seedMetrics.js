// seedMetrics.js (unchanged)
import Metric from '../model/Metric.js';

const STANDARD_METRICS = [
  { name: 'Bodyweight',            unit: 'lbs',    description: 'Your weight in pounds.' },
  { name: 'Bodyweight (kg)',       unit: 'kg',     description: 'Your weight in kilograms.' },
  { name: 'Calories Consumed',     unit: 'kcal',   description: 'Total calories eaten today.' },
  { name: 'Calories Burned',       unit: 'kcal',   description: 'Total calories burned today.' },
  { name: 'Bench Press 1RM',       unit: 'lbs',    description: 'One-rep max bench press (lbs).' },
  { name: 'Squat 1RM',             unit: 'lbs',    description: 'One-rep max squat (lbs).' },
  { name: 'Deadlift 1RM',          unit: 'lbs',    description: 'One-rep max deadlift (lbs).' },
  { name: 'Pull-Ups Max',          unit: 'reps',   description: 'Max pull-ups in a single set.' },
  { name: 'Push-Ups Max',          unit: 'reps',   description: 'Max push-ups in a single set.' },
  { name: 'Running Distance',      unit: 'miles',  description: 'Distance run (miles).' },
  { name: 'Running Pace',          unit: 'min/mi', description: 'Average pace per mile.' },
  { name: 'Cycling Distance',      unit: 'miles',  description: 'Distance cycled (miles).' },
  { name: 'Cycling Speed',         unit: 'mph',    description: 'Average cycling speed (mph).' },
  { name: 'Steps',                 unit: 'steps',  description: 'Number of steps walked today.' },
  { name: 'Sleep Hours',           unit: 'hours',  description: 'Total sleep last night (hours).' },
  { name: 'Resting Heart Rate',    unit: 'bpm',    description: 'Resting heart rate (beats per minute).' },
  { name: 'Blood Pressure (Sys)',  unit: 'mmHg',   description: 'Systolic blood pressure.' },
  { name: 'Blood Pressure (Dia)',  unit: 'mmHg',   description: 'Diastolic blood pressure.' },
  { name: 'BMI',                   unit: '',       description: 'Body Mass Index.' },
  { name: 'Body Fat %',            unit: '%',      description: 'Body fat percentage.' },
  { name: 'Waist Circumference',   unit: 'inches', description: 'Waist measurement in inches.' },
  { name: 'Hip Circumference',     unit: 'inches', description: 'Hip measurement in inches.' },
  { name: 'Protein Intake',        unit: 'g',      description: 'Grams of protein today.' },
  { name: 'Carb Intake',           unit: 'g',      description: 'Grams of carbohydrates today.' },
  { name: 'Fat Intake',            unit: 'g',      description: 'Grams of fat today.' },
  { name: 'Water Intake',          unit: 'oz',     description: 'Ounces of water consumed today.' },
  { name: 'Mood Rating',           unit: 'score',  description: 'Subjective mood rating (1–10).' },
  { name: 'Stress Level',          unit: 'score',  description: 'Subjective stress level (1–10).' }
];

export async function seedStandardMetrics() {
  for (const m of STANDARD_METRICS) {
    await Metric.updateOne(
      { name: m.name },
      {
        $setOnInsert: {
          unit:        m.unit,
          description: m.description,
          createdAt:   new Date()
        }
      },
      { upsert: true }
    );
  }
  console.log('✅ Standard metrics seeding complete.');
}
