import TodoContext from "../contexts/TodoProvider"
import { useContext } from "react"

export default function TodoForm() {
    const { todos, inputValue, addTodo, updateDateValue, updateInputValue } =
        useContext(TodoContext)

    return (
        <>
            <section className="grid gap-4 p-5">
                <form className="flex gap-2" onSubmit={addTodo}>
                    <label>
                        Your todo:
                        <input
                            value={inputValue}
                            onChange={event => {
                                updateInputValue(event.target.value)
                            }}
                            placeholder="Your todo"
                            className="bg-slate-200 pl-2 rounded-sm border border-slate-800"
                            type="text"
                        />
                    </label>
                    <input
                        type="date"
                        name="dateInput"
                        id="dateInput"
                        onChange={event => {
                            updateDateValue(event.target.value)
                        }}
                    />
                    <button
                        className="rounded-md bg-slate-800 text-white px-4"
                        type="submit"
                    >
                        Add
                    </button>
                </form>
            </section>
        </>
    )
}
