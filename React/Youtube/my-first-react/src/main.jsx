import { createRoot } from 'react-dom/client';
import React, { Suspense } from 'react';
// import Greeting from "./Greeting";

// const LazyGreeting = React.lazy(() => import('./Greeting'));
const LazyGreeting = React.lazy(() =>
  new Promise((resolve) => {
    setTimeout(() => resolve(import('./Greeting')), 2000);
  })
)

function App() {
    return(
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <LazyGreeting />
            </Suspense>
        </div>
    )
}

createRoot(document.getElementById('root')).render(
    <App />
);