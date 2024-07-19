import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import "./RootLayout.css";

function RootLayout() {
    return (
        <>
            <Header />
            <main className="main__content">
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout
