import "./App.css"
import TodoForm from "./Components/TodoForm"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { parseISO, isToday, isThisWeek } from "date-fns"

function App() {
    const [inputValue, setInputValue] = useState("")
    const [dateValue, setDateValue] = useState(null)
    const [todos, setTodos] = useState([
        { id: nanoid(), name: "Buy coffee" },
        { id: nanoid(), name: "Water plants" },
    ])
    const [filteredTodos, setFilteredTodos] = useState([])
    const [currentFilter, setCurrentFilter] = useState("inbox")

    //filter todos and update dom on filter & todo change//
    useEffect(() => {
        if (currentFilter === "inbox") {
            setFilteredTodos([...todos])
        }
        if (currentFilter === "today") {
            setFilteredTodos(
                todos.filter(todo => {
                    return isToday(parseISO(todo.date))
                })
            )
        }
        if (currentFilter === "thisWeek") {
            setFilteredTodos(
                todos.filter(todo => {
                    return isThisWeek(parseISO(todo.date))
                })
            )
        }
    }, [todos, currentFilter])

    return (
        <>
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            <header>
                <nav>
                    <button
                        onClick={() => {
                            setCurrentFilter("inbox")
                        }}
                    >
                        Inbox
                    </button>
                    <button
                        onClick={() => {
                            setCurrentFilter("today")
                        }}
                    >
                        Today
                    </button>
                    <button
                        onClick={() => {
                            setCurrentFilter("thisWeek")
                        }}
                    >
                        This Week
                    </button>
                </nav>
            </header>
            <TodoForm
                todos={todos}
                setTodos={setTodos}
                inputValue={inputValue}
                setInputValue={setInputValue}
                dateValue={dateValue}
                setDateValue={setDateValue}
            />
            {/* Create todo component like <TodoModule/> or something? */}
            {filteredTodos ? (
                <ul className="list-disc">
                    {filteredTodos.map(todo => {
                        return (
                            <li className="list-inside" key={todo.id}>
                                {todo.name} {dateValue ? "-" : " "} {todo.date}
                            </li>
                        )
                    })}
                </ul>
            ) : (
                ""
            )}
        </>
    )
}

export default App
