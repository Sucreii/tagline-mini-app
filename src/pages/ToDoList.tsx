'use client'
import { useState, useEffect } from 'react'
import '../App.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { ThemeProvider } from '../components/theme'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const FormSchema = z.object({
    title: z
    .string()
    .min(8, {
        message: "Title must be at least 8 characters.",
    }), 
    description: z
    .string()
    .min(15, {
        message: "Minimum 15 characters required for description.",
    }), 
})
type listItem ={ 
    id: number, 
    title: string, 
    description: string, 
    completed: boolean
}

export default function App() {

    const [todolist, setToDoList] = useState<listItem[]>([])
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState<{ [id: number]: string}>({})
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: '',
            description: ''
        }
    })

    const getapi = async () => {
        try{
            const result = await axios.get(`${import.meta.env.VITE_APP_API}/todos`)

            setToDoList(result.data)
            setLoading(false)
            console.log('API Result: ', result.data)
        }
        catch(err){
            console.log('Error fetching data:', err)
        }
    }

    const postapi = async (data: z.infer<typeof FormSchema>) => {
        try{
            const payload = {
                title: data.title,
                description: data.description,
                completed: false
            }
            const formRes = await axios.post(`${import.meta.env.VITE_APP_API}/todos`, payload)
    
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Welcome to my To Do App!',
            }).then(() => {
                window.location.href = '/todolist'
            })
            console.log('Form Response:', formRes.data)
        }
        catch(err){
            console.log('Error posting data:', err)
        }
    }

    const removeItem = async (id: number) => {
        try{
            const remove = await axios.delete(`${import.meta.env.VITE_APP_API}/todos/${id}`)

            console.log('Item removed:', remove.data)
            setToDoList(prev => prev.filter(item => item.id !== id))
        }
        catch(err){
            console.log('Error removing item:', err)
        }
    }

    useEffect(() => {
        getapi()
    }, [])

    return (
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <div className='w-full h-[90vh] flex flex-col md:flex-row justify-center items-center gap-5'>
                <div className='flex justify-center min-w-sm md:w-1xl dark:bg-[#171717] bg-[#D9D9D9] rounded-sm py-8'>
                    <Form {...form}>
                        <form 
                            onSubmit={form.handleSubmit(postapi)}
                            className='w-3/4 space-y-4'
                        >
                            <FormField
                                control={form.control}
                                name='title'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Task Title</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Clean the house"
                                                className="resize-none min-h-9"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Input brief description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="I mopped the floor and cleaned the windows"
                                                className="resize-none min-h-9"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className='w-full bg-emerald-400'>Submit</Button>
                        </form>
                    </Form>
                </div>

                <div className='flex justify-center min-w-sm md:w-2l dark:bg-[#171717] bg-[#D9D9D9] rounded-sm py-8 '>
                    <div className='grid w-3/4 gap-2'>
                        {
                            todolist.length === 0 && loading ? (
                                <>
                                <p className='text-base text-[14px] font-medium'>
                                    Task title
                                </p>
                                <Textarea placeholder='No tasks yet' className="resize-none min-h-9" disabled />
                                </>
                            )
                            :
                            todolist.map(( content, index ) => {

                                const currentStatus = status[content.id] || ''

                                return(
                                    <div key={content.id || index}>
                                        <p className='text-base text-[14px] font-medium pb-1'>
                                            {content.title }
                                        </p>
                                        <Textarea placeholder={content.description || 'No description'} className="resize-none min-h-9" disabled />
                                        <RadioGroup 
                                            className='flex justify-start pt-2' 
                                            value={currentStatus}
                                            onValueChange={(value) => setStatus(prev => ({ ...prev, [content.id]: value }))}
                                        >
                                            <div className='flex items-center gap-2'>
                                                <RadioGroupItem value="completed" id={`completed-${content.id}`} />
                                                <Label 
                                                    htmlFor={`completed-${content.id}`}
                                                    className={`text-xs ${status === 'completed' ? 'text-blue-500' : ''}`}
                                                >
                                                    Completed
                                                </Label>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <RadioGroupItem value="incomplete" id={`incomplete-${content.id}`} />
                                                <Label 
                                                    htmlFor={`incomplete-${content.id}`}
                                                    className={`text-xs ${status === 'incomplete' ? 'text-yellow-500' : ''}`}
                                                >
                                                    Incomplete
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                        <div className='flex justify-end'>
                                            <Button className='bg-red-600 mt-1 h-6' onClick={() => removeItem(content.id)}>Remove</Button>
                                        </div>
                                        {index !== todolist.length - 1 && <Separator className="my-4" />}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}