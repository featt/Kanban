import { GET_BOARD } from '../graphql/quereis'
import { useQuery } from '@apollo/client'

export const useBoard = (boardId) => {

  const { data, refetch } = useQuery(GET_BOARD, {
    variables: { boardId },
    fetchPolicy: 'no-cache'
  })

  const groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const titleBoard = data?.board?.title

  const groupedTasks = groupBy(data?.board?.tasks || [], "status") || {}

  const items = {
    NOT_DONE: groupedTasks["NOT_DONE"] || [],
    IN_PROGRESS: groupedTasks["IN_PROGRESS"] || [],
    DONE: groupedTasks["DONE"] || []
  }

  return { items: data === null ? null : items, refetch, titleBoard };
}
