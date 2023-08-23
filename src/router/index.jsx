import { createBrowserRouter } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import { lazy } from 'react';

const Layout = lazy(() => import('/src/pages/Layout'))
const Login = lazy(() => import('/src/pages/Login'))

import { AuthRoute } from '../components/AuthComponent'

const Home = lazy(() => import('/src/pages/Home'))
const Article = lazy(() => import('/src/pages/Article'))
const Publish = lazy(() => import('/src/pages/Publish'))

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
