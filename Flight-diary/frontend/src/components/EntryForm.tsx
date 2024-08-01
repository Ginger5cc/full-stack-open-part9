import type { Message, Diary, ValidationError  } from "../types"
import { useState } from "react"
import DiaryService from '../services/diaries'
import axios from 'axios'

interface EntryFormProps {
    diary : Diary[],
    setDiary:  React.Dispatch<React.SetStateAction<Diary[]>>
    setMessage:  React.Dispatch<React.SetStateAction<Message | null>>
}

const EntryForm = ( props: EntryFormProps): JSX.Element => {
    const [date, setDate] = useState('')
    const [weather, setWeather] = useState('')
    const [visibility, setVisibility] = useState('')
    const [comment, setComment] = useState('')

    const addToServer = async(newEntry: Diary) => {
        try {
            const response = await DiaryService.create(newEntry)
            props.setDiary(props.diary.concat(response))
            
            props.setMessage( {types: "update", msg : "added new entry"})
            setTimeout( () => props.setMessage(null), 3000 )
            
            setDate('');
            setComment('');
            
        } catch (error) {
            if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
              console.log('error.status is', error.status)
              console.error('error.response is', error.response);
              props.setMessage( {types: "error", msg : String(error.response?.data)})
              setTimeout( () => props.setMessage(null), 3000 )
            } else {
              console.error(error);
              props.setMessage( {types: "error", msg : 'Unknown Error'})
              setTimeout( () => props.setMessage(null), 3000 )
            }
          }
    }

    const createEntry = (event : React.SyntheticEvent) => {
        event.preventDefault()
        const newEntry = {
            id: props.diary.length + 1,
            date: date,
            weather: weather,
            visibility: visibility,
            comment: comment
        }
        addToServer(newEntry);
    
    }

    return(
        <>
        <form onSubmit={createEntry}>
            <div>
                <label htmlFor="date" >Date </label>
                <input 
                    value = {date}
                    type="date"
                    name="date"
                    id ="date"
                    onChange={e => setDate(e.target.value)} />
            </div>
            <div>
                <label htmlFor="weather" >Weather </label>
                <input value='sunny' type="radio" name="weather"
                    onChange={e => setWeather(e.target.value)} />sunny
                <input value='rainy' type="radio" name="weather"
                    onChange={e => setWeather(e.target.value)} />rainy
                <input value='cloudy' type="radio" name="weather"
                    onChange={e => setWeather(e.target.value)} />cloudy
                <input value='stormy' type="radio" name="weather"
                    onChange={e => setWeather(e.target.value)} />stormy
                <input value='windy' type="radio" name="weather"
                    onChange={e => setWeather(e.target.value)} />windy
            </div>
            <div>
                <label htmlFor="visibility" >Visibility </label>
                <input value='great' type="radio" name="visibility"
                    onChange={e => setVisibility(e.target.value)} />great
                <input value='good' type="radio" name="visibility"
                    onChange={e => setVisibility(e.target.value)} />good
                <input value='okay' type="radio" name="visibility"
                    onChange={e => setVisibility(e.target.value)} />okay
                 <input value='poor' type="radio" name="visibility"
                    onChange={e => setVisibility(e.target.value)} />poor
            
            </div>
            <div>
                <label htmlFor="comment" >Comment </label>
                <input
                    value = {comment}
                    type="string"
                    name="comment"
                    id ="comment"
                    onChange={e => setComment(e.target.value)} />
            </div>
            <button type='submit'>Add</button>
        </form>
        </>
    )
}

export default EntryForm