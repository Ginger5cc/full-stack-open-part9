import axios from 'axios'
const baseUrl = '/api/diaries'
import { Diary } from '../types'

const getAll = async() => {
    const request = await axios.get<Diary[]>(baseUrl)
    return request.data
};

const create = async (newObject : Diary) => {
    const response = await axios.post(baseUrl, newObject )
    return response.data
}

export default { getAll, create } 