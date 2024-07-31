import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ data }: { data : CoursePart[] }) => {
  
    return (
        <>
        {data.map( part => <Part key={part.name} part = {part}/>)}
        </>
    )
}

export default Content