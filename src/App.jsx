import "./App.css"
import { FilterProvider } from "./Components/contexts/FilterProvider"
import { TodoProvider } from "./Components/contexts/TodoProvider"
import Nav from "./Components/nav/Nav"
import Main from "./Components/main/main"

function App() {
    return (
        <>
            <TodoProvider>
                <FilterProvider>
                    <Nav />
                    <Main />
                </FilterProvider>
            </TodoProvider>
        </>
    )
}

export default App
