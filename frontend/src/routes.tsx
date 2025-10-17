import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Register } from "./pages/register"
import { Login } from "./pages/login"
import { Home } from "./pages/home"
import { Posts } from "./pages/posts"

export const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/auth" caseSensitive={true}>
                        <Route path="sign-up" caseSensitive={true} Component={Register}></Route>
                        <Route path="sign-in" caseSensitive={true} Component={Login}></Route>
                    </Route>
                    <Route path="/" caseSensitive={true} Component={Home}></Route>
                    <Route path="/posts" caseSensitive={true} Component={Posts}></Route>

                </Routes>
            </BrowserRouter>
        </>
    )
}