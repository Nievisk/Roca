import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Register } from "./pages/register"

export const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/auth" caseSensitive={true}>
                        <Route path="sign-up" caseSensitive={true} Component={Register}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}