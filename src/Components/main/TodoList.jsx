import { parseISO, isToday, isThisWeek } from "date-fns"
import { useState, useEffect, useContext } from "react"
import { FilterContext } from "../contexts/FilterProvider"
import TodoContext from "../contexts/TodoProvider"

export const TodoList = () => {
    const { currentFilter } = useContext(FilterContext)
    const { todos, dateValue } = useContext(TodoContext)
    console.log(currentFilter)
    const [filteredTodos, setFilteredTodos] = useState()

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
    {
        return filteredTodos ? (
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
        )
    }

    {
    }
}
