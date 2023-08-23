import { createBrowserRouter } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import Layout from '../pages/Layout'
import Login from '../pages/Login'
import { AuthRoute } from '../components/AuthComponent'

import Home from '/src/pages/Home'
import Article from '/src/pages/Article'
import Publish from '/src/pages/Publish'

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                path: 'article',
                element: <Article />
            },
            {
                // path: 'home',
                index: 'true',
                element: <Home />
            },
            {
                path: 'publish',
                element: <Publish />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '*',
        element:  <Navigate to="/" replace={true} />,
    }
])

export default router
