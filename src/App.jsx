import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {createBrowserRouter, RouterProvider} from 'react-router';
import Layout from './Layout.jsx';
import Home from './Home.jsx';
import Game from './Game.jsx';
import Games from './Games.jsx';
import CreateGame from './CreateGame.jsx';
import EditGame from './EditGame.jsx';
import NotFound from "./NotFound.jsx";

const router = createBrowserRouter(
    [
        {
            element: <Layout/>,
            children: [
                {
                    path: "/",
                    element: <Home/>
                },
                {
                    path: "/games",
                    element: <Games/>
                },
                {
                    path: "/games/create",
                    element: <CreateGame/>
                },
                {
                    path: "/games/:id",
                    element: <Game/>
                },
                {
                    path: "/games/:id/edit",
                    element: <EditGame/>
                },
                {
                    path: "/notfound",
                    element: <NotFound/>
                },
                {
                    path: "*",
                    element: <NotFound/>
                }
            ]
        }
    ],
);

function App() {
    const [inProp, setInProp] = useState(false);

    return (
        <>
            <RouterProvider router={router}/>
            <button onClick={() => setInProp(!inProp)}>Toggle Transition</button>
            <Home in={inProp}/>
        </>
    );
}

export default App;
