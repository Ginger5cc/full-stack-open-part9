/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';
const app = express();
const qs = require('qs');
import calculateBmi from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
    
    let data = qs.parse(req.query);
    
    const bmi = calculateBmi(data.height, data.weight);
    if (bmi !== "Unknown") {
        data = {... data, bmi : bmi};
        return res.status(200).json(data);
    } else {
        return res.status(400).json({ error: "malformatted parameters" });
    }
});

app.post('/exercises', (req, res) => {
  const info = req.body;
  if (!info.daily_exercises || !info.target ) {
    return res.status(400).json({ error: "parameters missing" });
  }  else {
        const checkNan = info.daily_exercises.map( (n: unknown) => !isNaN(Number(n))).every((bool: boolean) => bool);
        const checkTarget = !isNaN(Number(info.target));
        if (checkNan && checkTarget){
          return res.status(200).json(calculateExercises(info.target, info.daily_exercises));
        } else { 
          return res.status(400).json({ error: "malformatted parameters" });
        }
  } 
}); 


  

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});