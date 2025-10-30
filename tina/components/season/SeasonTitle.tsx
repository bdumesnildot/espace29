import type {
  SeasonQuery,
  SeasonQueryVariables,
} from "@tina/__generated__/types"
import { tinaField, useTina } from "tinacms/dist/react"

type SeasonTitleProps = {
  variables: SeasonQueryVariables
  data: SeasonQuery
  query: string
}

export const SeasonTitle: React.FC<SeasonTitleProps> = (props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })
  const season = data.season
  const { name } = season

  return <span data-tina-field={tinaField(season, "name")}>{name}</span>
}
