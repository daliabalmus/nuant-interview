import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {Provider} from "react-redux";
import store from './store';
import Custom404 from "./modules/404";
import Homepage from "./modules/Homepage/Homepage";
import Details from "./modules/Details";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

// Browser router configuration
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <Custom404 />,
		children: [
			{ index: true, element: <Homepage /> },
			{
				path: "/:name",
				element: <Details />,
				errorElement: <Custom404 />
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
  </React.StrictMode>,
)
