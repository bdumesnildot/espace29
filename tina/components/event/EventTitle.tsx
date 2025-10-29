import type {
  ArtistQuery,
  ArtistQueryVariables,
} from "@tina/__generated__/types"
import { tinaField, useTina } from "tinacms/dist/react"

type ArtistTitleProps = {
  variables: ArtistQueryVariables
  data: ArtistQuery
  query: string
}

export const ArtistTitle: React.FC<ArtistTitleProps> = (props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })
  const artist = data.artist
  const { firstName, lastName } = artist

  return (
    <div className="flex items-center justify-start gap-2">
      {firstName && (
        <span data-tina-field={tinaField(artist, "firstName")}>
          {firstName}
        </span>
      )}
      <span data-tina-field={tinaField(artist, "lastName")}>{lastName}</span>
    </div>
  )
}
