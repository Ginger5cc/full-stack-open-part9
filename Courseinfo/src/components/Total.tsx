interface totalProps {
    total: number;
}

const Total = (props: totalProps) => {
    return <p>Number of exercises {props.total}</p>
}

export default Total