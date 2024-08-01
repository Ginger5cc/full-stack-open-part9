import { Message } from "../types"

const Notification = ( { message } : { message: Message | null }): JSX.Element | null => {

    if (message === null) {
        return null 
    }
    
    return (
        <div className={message.types}>{ message.msg }</div>
    )
}

export default Notification