import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Inicio } from '../components/Inicio'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { NotFound } from '../NotFound'
import { ShowFavorites } from '../components/ShowFavorites'

export const RouterPrincipal = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
        <Route path='/' element={<Navigate to='/inicio' />} />
        <Route path='/inicio' element={<Inicio />} />
        <Route path='/favoritos' element={<ShowFavorites />} />
        <Route path="*" component={<NotFound />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}
