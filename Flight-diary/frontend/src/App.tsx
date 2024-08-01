import { useEffect, useState } from 'react'
import DiaryService from './services/diaries'
import { Diary, Message} from './types'
import EntryForm from './components/EntryForm'
import Notification from './components/Notification'

const App = () => {
  const [diary, setDiary] = useState<Diary[]>([])
  const [message, setMessage] = useState<Message | null>(null)

  useEffect(() => {
    DiaryService.getAll().then( response => {
      setDiary(response)
    }) 
  }, [])  
  
  return (
    <>
      <h2>Add New Entry</h2>
      <Notification message={ message }/>
      <EntryForm diary={ diary } setDiary={ setDiary } setMessage = { setMessage } />
      <br />
      <br />
      <h2>Diary Entries</h2>
      {diary.map(n => 
        <div key={n.id}>
          <b>{n.date}</b>
          <div>Weather: {n.weather}</div>
          <div>Visibility: {n.visibility}</div>
          <br />
        </div>
      )}
    </>
  )
}

export default App
