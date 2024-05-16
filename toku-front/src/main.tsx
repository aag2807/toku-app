import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Details from "./pages/Details.tsx";
import NavigationBottomBar from "./components/NavigationBottomBar.tsx";
import Navbar from "./components/Navbar.tsx";
import About from "./pages/About.tsx";
import Movies from "./pages/Movies.tsx";
import Series from "./pages/Series.tsx";

const Layout = () => (
	<div className="min-h-screen w-screen bg-white flex flex-col pb-[100px] relative">
		<Navbar/>
		<Outlet/>
		<NavigationBottomBar/>
	</div>
);

const router = createBrowserRouter( [
	{
		path: "/",
		element: <Layout/>,
		children: [
			{
				path: "",
				element: <Home/>,
			},
			{
				path: "details",
				element: <Details/>,
			},
			{
				path: "about",
				element: <About/>,
			},
			{
				path: "movies",
				element: <Movies/>,
			},
			{
				path: "series",
				element: <Series/>,
			},
			{
				path: "*",
				element: <NotFound/>,
			},
		],
	},
] );


ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>
	,
)
