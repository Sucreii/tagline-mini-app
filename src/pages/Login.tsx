'use client'
// import React, { useState } from 'react'
import Swal from 'sweetalert2'
import '../App.css'
// import { Eye, EyeOff } from "lucide-react"
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
import { Input } from '@/components/ui/input'

const FormSchema = z.object({
    username: z
    .string()
    .min(3, {
        message: "Username must be at least 3 characters.",
    }), 
    password: z
    .string()
    .min(8, {
        message: "Password must be at least 8 characters.",
    }), 
    email: z
    .string()
    .email({
        message: "Input a valid email address",
    })
})

export default function Login() {

    // const [showPassword, setShowPassword] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            password: '',
            email: ''
        }
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {

        const uNameValue = 'User1'
        const pWordValue = 'P@SSw0rd1'

        if(data.username === uNameValue || data.password === pWordValue){
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Welcome to my To Do App!',
            }).then(() => {
                window.location.href = '/'
            })
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid username or password',
            })
        }
    }

    return(
        <div className='w-full h-[90vh] flex justify-center items-center'>
            <div className='flex justify-center min-w-sm md:w-2xl dark:bg-[#171717] bg-[#D9D9D9] rounded-sm py-8'>
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='w-3/4 space-y-4'
                    >
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Johnny Johnny"
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
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type='email' placeholder='email@example.com' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <span
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-muted-foreground"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </span> */}
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}