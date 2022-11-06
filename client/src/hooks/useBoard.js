import { GET_BOARD } from '../graphql/quereis'
import { useQuery } from '@apollo/client'

export const useBoard = (boardId) => {

  if (boardId === null) return null

  const { data, refetch } = useQuery(GET_BOARD, {
    variables: {boardId},
    fetchPolicy: 'no-cache'
  })

  const groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const groupedTasks = groupBy(data?.board?.tasks || [], "status") || {}

  const items = {
    root:  groupedTasks["NOT_DONE"]?.map(t => t.title) || [],
    container1: groupedTasks["IN_PROGRESS"]?.map(t => t.title) || [],
    container2: groupedTasks["DONE"]?.map(t => t.title) || []
  }

  return { items, refetch };
}