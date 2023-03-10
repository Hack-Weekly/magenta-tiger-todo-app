import { useState, useEffect } from "react"
import dateConvert from "./utilFunctions/dateConvert"

const TodoList = ({ tasks }) => {
    const [todos, setTodos] = useState([])
    console.log(todos)

    useEffect(() => {
        setTodos(tasks)
    }, [tasks])

    return (
        <section>
            <ul className="list-disc">
                {todos
                    ? todos
                          .sort((a, b) => b.date - a.date)
                          .map(todo => {
                              return (
                                  <li className="list-inside" key={todo.id}>
                                      <p>name - {todo.name}</p>
                                      <p>date - {dateConvert(todo.date)}</p>
                                  </li>
                              )
                          })
                    : null}
            </ul>
        </section>
    )
}

export default TodoList
