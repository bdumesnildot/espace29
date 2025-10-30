export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export const formatDateRange = (dateStart: string, dateEnd?: string) => {
  const startFormatted = formatDate(dateStart)

  if (dateEnd) {
    const endFormatted = formatDate(dateEnd)
    return `${startFormatted} - ${endFormatted}`
  }

  return startFormatted
}
