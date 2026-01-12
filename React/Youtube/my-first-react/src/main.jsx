import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Home = () => <h1>🏠 홈페이지 입니다.</h1>;
const About = () => <h1>ℹ️ 소개 페이지입니다.</h1>
const NotFound = () => <h1>❌ 404: 페이지를 찾을 수 없습니다. </h1>;

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <NotFound />
    },
    {
        path: "/about",
        element: <About />,
    },
]);


createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)