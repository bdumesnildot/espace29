import type { EventQuery, EventQueryVariables } from "@tina/__generated__/types"
import { tinaField, useTina } from "tinacms/dist/react"

type EventTitleProps = {
  variables: EventQueryVariables
  data: EventQuery
  query: string
}

export const EventTitle: React.FC<EventTitleProps> = (props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })
  const event = data.event
  const { title } = event

  return <span data-tina-field={tinaField(event, "title")}>{title}</span>
}
