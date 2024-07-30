interface result { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: String,
    target: number,
    average: number
  }

const calculateExercises = (target, dailyhours): result=> {
    const periodLength =  dailyhours.length
    const trainingDays = dailyhours.filter( n => n !== 0).length
    const average = dailyhours.reduce( (sum, n ) => sum + n, 0) / dailyhours.length
    const difference = target - average
    let rating = 0
    let ratingDescription = ""
    switch (true) {
        case difference <= 0:
            rating = 3;
            ratingDescription = "Good Job! Target Met!"
            break
        case difference>0 && difference<=0.5:
            rating = 2;
            ratingDescription = "not too bad but could be better"
            break
        case difference > 0.5 :
            rating = 1;
            ratingDescription = "Need more effort!"
            break
        default :
            throw new Error('What is going on?');
    }
    return { 
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: difference <= 0 ,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
      }
}

interface inputArray {
    target: Number;
    dailyhours: number[];
}

const parseArray = (args: string[]) : inputArray => {
    if (args.length < 2) throw new Error('Not enough arguments');
    args.splice(0, 2)
    const checkNan = args.map( n => !isNaN(Number(n))).every(bool => bool)
    const dailyhours = args.map( n => Number(n))
    dailyhours.splice(0,1)
    console.log(dailyhours)
    if (checkNan) {
        return {
            target: Number(args[0]),
            dailyhours: dailyhours
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
    }

const {target , dailyhours} = parseArray (process.argv);
console.log(calculateExercises(target, dailyhours))