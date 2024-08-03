import type { Diagnosis, HospitalEntry } from "../../types";



const HospitalEntry = ( {entry, diagnoses} : {entry: HospitalEntry; diagnoses: Diagnosis[]}) => {
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
                <div>Discharge Date: {entry.discharge.date}</div>
                <div>diagnose by {entry.specialist}</div>
                <br/>
            </div>
        );
    }
        
    return (
        <>
            <div><b>{entry.date} Health Check</b></div>
            <div><i>{entry.description}</i></div>
            <div>Discharge Date: {entry.discharge.date}</div>
            <div>diagnose by {entry.specialist}</div>
            <br/>
        </>
        
    );
};

export default HospitalEntry;