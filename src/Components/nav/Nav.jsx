import React, { useContext } from "react"
import FilterContext from "../contexts/FilterProvider"

export default function Nav() {
    const { currentFilter } = useContext(FilterContext)
    const { updateFilter } = useContext(FilterContext)
    return (
        <header>
            <nav>
                <button
                    onClick={() => {
                        updateFilter("inbox")
                    }}
                >
                    Inbox
                </button>
                <button
                    onClick={() => {
                        updateFilter("today")
                    }}
                >
                    Today
                </button>
                <button
                    onClick={() => {
                        updateFilter("thisWeek")
                    }}
                >
                    This Week
                </button>
                ß
            </nav>
        </header>
    )
}
