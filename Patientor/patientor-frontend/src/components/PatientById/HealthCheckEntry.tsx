import type { Diagnosis, HealthCheckEntry } from "../../types";


const HealthCheckEntry = ( {entry, diagnoses} : {entry: HealthCheckEntry; diagnoses: Diagnosis[]}) => {
    if (entry.diagnosisCodes) {
        return (
            <div>
                <div><b>{entry.date} Health Check</b></div>
                <div><i>{entry.description}</i></div>
                <ul>
                {entry.diagnosisCodes.map( n => {
                    const diagnosis = diagnoses.find( item => item.code === n);
                    return <li key={n}>{n} {diagnosis?.name}</li>;
                } )}
                </ul>
                <div>healthCheckRating: {entry.healthCheckRating}</div>
                <div>diagnose by {entry.specialist}</div>
                <br/>
            </div>
        );
    }
        
    return (
        <>
            <div><b>{entry.date} Health Check</b></div>
            <div><i>{entry.description}</i></div>
            <div>healthCheckRating: {entry.healthCheckRating}</div>
            <div>diagnose by {entry.specialist}</div>
            <br/>
        </>
    );
};

export default HealthCheckEntry;