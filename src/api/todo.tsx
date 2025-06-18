'use server'
import axios from 'axios'

export async function getToDo() {

    try{
        const res = await axios.get(`${process.env.NEXT_APP_API}/todos`)

        console.log(res)
        return res
    }
    catch(err){
        console.error('Error fetching data:', err)
    }
}