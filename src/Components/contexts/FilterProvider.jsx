import { createContext, useState } from "react"

export const FilterContext = createContext()

export function FilterProvider({ children }) {
    const [currentFilter, setCurrentFilter] = useState("inbox")

    const updateFilter = newFilter => {
        setCurrentFilter(newFilter)
    }

    return (
        <FilterContext.Provider value={{ currentFilter, updateFilter }}>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterContext
