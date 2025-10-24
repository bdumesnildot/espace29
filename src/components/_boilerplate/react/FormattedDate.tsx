import React from "react"

function FormattedDate({ date }: { date: string | null | undefined }) {
  const _date = date ? new Date(date) : new Date()
  return (
    <time dateTime={_date.toISOString()}>
      {_date.toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </time>
  )
}

export default FormattedDate
