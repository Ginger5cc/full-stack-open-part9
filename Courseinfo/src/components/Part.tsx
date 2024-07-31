import { CoursePart } from "../types"

const Part = ({part}: { part : CoursePart }) => {
    switch (part.kind) {
        case "basic":
            return (
                <div key={part.name}>
                <div><b>{part.name} {part.exerciseCount}</b></div>
                <div><i>{part.description}</i></div>
                <br />
                </div>
            )
        case "group":
            return (
                <div key={part.name}>
                <div><b>{part.name} {part.exerciseCount}</b></div>
                <div>project exercises {part.groupProjectCount}</div>
                <br />
                </div>
            )

        case "background":
            return (
                <div key={part.name}>
                <div><b>{part.name} {part.exerciseCount}</b></div>
                <div><i>{part.description}</i></div>
                <div>submit to {part.backgroundMaterial}</div>
                <br />
                </div>
            )
        case "special":
            return (
                <div key={part.name}>
                <div><b>{part.name} {part.exerciseCount}</b></div>
                <div><i>{part.description}</i></div>
                <div>required skills: {part.requirements.join(', ')}</div>
                <br />
                </div>
            )

        default:
            console.log('Unknown Kinds')
            break
    }
}
export default Part