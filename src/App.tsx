'use client'
// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme'
import './App.css'

import Navbar from './components/navbar'
import Login from './pages/Login'
import ToDoList from './pages/ToDoList'

export default function App() {

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Router>
        <Navbar />

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/todolist' element={<ToDoList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}