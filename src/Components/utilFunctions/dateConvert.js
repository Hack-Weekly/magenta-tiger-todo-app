export default function dateConvert(timestamp) {
    const date = new Date(timestamp)
    const options = { day: "numeric", month: "long", year: "numeric" }
    const formattedDate = date.toLocaleDateString("en-GB", options)

    return formattedDate
}
