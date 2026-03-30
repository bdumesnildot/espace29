import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react"
import { classMerge } from "@styles/utils"
import { useState } from "react"

export type SearchItem = {
  title: string
  subtitle: string
  href: string
  imageUrl?: string
  searchText: string
}

type SearchDropdownProps = {
  items: SearchItem[]
  placeholder?: string
  maxResults?: number
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  items,
  placeholder = "Rechercher...",
  maxResults = 5,
}) => {
  const [query, setQuery] = useState("")

  const filteredItems =
    query === ""
      ? []
      : items
          .filter((item) => item.searchText.includes(query.toLowerCase()))
          .slice(0, maxResults)

  const handleSelect = (item: SearchItem | null) => {
    if (item) {
      window.location.href = item.href
    }
  }

  return (
    <Combobox immediate onChange={handleSelect} onClose={() => setQuery("")}>
      <div className="relative w-full max-w-sm">
        <ComboboxInput
          aria-label={placeholder}
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          className={classMerge(
            "font-eina03 w-full border border-gray-700 bg-white px-3 py-2",
            "text-lg text-gray-900 placeholder:text-gray-400",
            "focus:outline-none",
            "transition-colors duration-150"
          )}
        />
        <ComboboxOptions
          anchor="bottom start"
          transition
          className={classMerge(
            "w-(--input-width) border border-gray-700 bg-white shadow-lg",
            "transition duration-150 ease-out",
            "data-closed:opacity-0"
          )}
        >
          {filteredItems.length === 0 && query !== "" ? (
            <div className="font-eina03 px-3 py-2 text-lg text-gray-400">
              Aucun résultat
            </div>
          ) : (
            filteredItems.map((item) => (
              <ComboboxOption
                key={item.href}
                value={item}
                className={classMerge(
                  "flex cursor-pointer items-center gap-3 px-3 py-2",
                  "data-focus:bg-gray-100"
                )}
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="h-8 w-8 shrink-0 rounded object-cover"
                  />
                )}
                <div className="min-w-0">
                  <div className="font-eina03 truncate text-lg font-semibold text-gray-900">
                    {item.title}
                  </div>
                  {item.subtitle && (
                    <div className="font-eina03 truncate text-lg text-gray-500">
                      {item.subtitle}
                    </div>
                  )}
                </div>
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  )
}
