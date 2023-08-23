import { RouterProvider } from 'react-router-dom'

import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'

import router from './router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense
    fallback={
      <div
        style={{
          textAlign: 'center',
          marginTop: 200
        }}
      >
        loading...
      </div>
    }
  >
    <RouterProvider router={router} />
  </Suspense>
)
