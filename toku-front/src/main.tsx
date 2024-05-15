import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Details from "./pages/Details.tsx";

const router = createBrowserRouter( [
	{
		path: "/",
		element: <Home/>,
	},
	{
		path: "/details",
		element: <Details/>,
	},
	{
		path: "*",
		element: <NotFound/>
	},
] );


ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
	<React.StrictMode>
		<main className={"min-h-screen min-w-screen bg-white flex flex-col pb-10"}>
			<RouterProvider router={router}/>
		</main>
	</React.StrictMode>
	,
)
