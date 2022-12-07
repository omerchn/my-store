import { useGetItemsQuery } from '../__generated__/types-and-hooks'

export default function ItemsPage() {
  const { data, loading } = useGetItemsQuery({
    variables: {
      filterBought: {
        bought: false,
      },
    },
  })

  return loading ? (
    <h3>loading...</h3>
  ) : (
    <ul>
      {data?.items.map((item) => (
        <li key={item.id}>
          <span>name: {item.name}</span>
          <span> is bought: {item.bought ? 'v' : 'x'}</span>
        </li>
      ))}
    </ul>
  )
}
