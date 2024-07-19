import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css'
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Messages from "./pages/Messages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "messages",
                element: <Messages />
            }
        ]

    }
]);

function App() {
    return (
        <RouterProvider router={router} />
    )

}

export default App
