import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from 'react';

import MenuPrivado from './componentes/MenuPrivado'
import MenuPublico from './componentes/MenuPublico'

import Home from './componentes/Home'
import Sobre from './componentes/Sobre'

import Clinica from './componentes/telas/clinica/Clinica'
import Medico from './componentes/telas/medico/Medico'
import Login from "./componentes/telas/login/Login";

const router = createBrowserRouter([
  {
    path : "/",
    element : <MenuPublico/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "login",
        element : <Login/>
      },
      {
        path : "sobre",
        element : <Sobre/>
      }           
    ]
  },
  {
    path : "privado",
    element : <MenuPrivado/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "sobre",
        element : <Sobre/>
      }
      ,
      {
        path : "clinicas",
        element : <Clinica/>
      },
      {
        path : "medicos",
        element : <Medico/>
      }            
    ]
  }  
])

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;