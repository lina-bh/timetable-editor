export function update<T>(array: T[], index: number, newItem: T): T[] {
  return array.map((oldItem, thisIndex) =>
    index === thisIndex ? newItem : oldItem
  )
}

export function deleteElement<T>(array: T[], index: number): T[] {
  return array.filter((_item, thisIndex) => index !== thisIndex)
}
