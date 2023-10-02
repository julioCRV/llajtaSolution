import { useState } from 'react'
import './App.css'
import Footer from './components/Footer.jsx'
import { ModalConfirmation } from './components/ModalConfirmation'
import { AlertConfirmation } from './components/AlertConfirmation'
import InputConLimiteDeCaracteres from './components/InputConLimiteDeCaracteres'
import { MenuNavegacion } from './components/menuNavegacion'
import { CrudApp } from './components/CrudApp'
import { CrudApi } from './components/CrudApi'
import { PruebaHttp } from './components/PruebaHttp'
import DataFetchingComponent from './components/DataFetchingComponent'
function App() {
  return (
    <>

      <ModalConfirmation/>

      <CrudApp/>
      <Footer/>
    </>
  )
}

export default App
