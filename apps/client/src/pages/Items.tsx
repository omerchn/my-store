import { useGetItemsQuery } from '../__generated__/types-and-hooks'

interface Props {
  bought: boolean
}

export default function ItemsPage(props: Props) {
  const { data, loading } = useGetItemsQuery({
    variables: {
      filterBought: {
        bought: props.bought,
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
          <span> bought: {item.bought ? 'v' : 'x'}</span>
        </li>
      ))}
    </ul>
  )
}
