import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

function PageLayout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default PageLayout;