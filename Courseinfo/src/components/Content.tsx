interface content {
    name: string;
    exerciseCount: number;
}

interface contentProps {
    data: content[];
}

const Content = (props: contentProps) => {
    return (
        <div>
        {props.data.map( n => <p key={n.name}>{n.name} {n.exerciseCount}</p>)}
        </div>
    )
}

export default Content