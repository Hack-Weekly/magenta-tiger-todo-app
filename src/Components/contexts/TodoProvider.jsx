import { createContext, useState } from "react"
import { nanoid } from "nanoid"

export const TodoContext = createContext()

export function TodoProvider({ children }) {
    const [inputValue, setInputValue] = useState("")
    const [dateValue, setDateValue] = useState(null)
    const [todos, setTodos] = useState([
        { id: nanoid(), name: "Buy coffee" },
        { id: nanoid(), name: "Water plants" },
    ])

    function updateInputValue(newValue) {
        setInputValue(newValue)
    }

    function updateDateValue(newValue) {
        setDateValue(newValue)
    }

    function addTodo(event) {
        event.preventDefault()
        setTodos([
            ...todos,
            { id: nanoid(), name: inputValue, date: dateValue },
        ])
        setInputValue("")
    }

    return (
        <TodoContext.Provider
            value={{
                todos,
                inputValue,
                addTodo,
                updateDateValue,
                updateInputValue,
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContext
