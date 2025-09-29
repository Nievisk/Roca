import { UsernameContextProvider } from "./context/authContext"
import { AppRouter } from "./routes"

function App() {

  return <UsernameContextProvider><AppRouter /></UsernameContextProvider>
}

export default App