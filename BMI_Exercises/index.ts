import express from 'express';
const app = express();
const qs = require('qs')
import { calculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
    let data = qs.parse(req.query)
    const bmi = calculateBmi(data.height, data.weight)
    if (bmi !== "Unknown") {
        data = {... data, bmi : bmi}
        return res.status(200).json(data)
    } else {
        return res.status(400).json({ error: "malformatted parameters" })
    }
  });
  

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});