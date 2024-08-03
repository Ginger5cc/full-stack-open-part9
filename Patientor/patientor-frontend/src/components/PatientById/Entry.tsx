import type { Diagnosis, Entry, EntryWithoutId } from "../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthCareEntry from "./OccupationalHealthcareEntry";


interface Props {
    entry: Entry
    diagnoses : Diagnosis[]
}

const ShowEntry = ( {entry, diagnoses} : Props) => {
    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
        case "Hospital":
            return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthCareEntry entry={entry} diagnoses={diagnoses}/>;
        default: 
            break;
    }
};

export default ShowEntry;