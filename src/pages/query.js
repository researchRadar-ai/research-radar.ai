import Head from 'next/head'
import Error from 'next/error'
import Papers from '../components/Papers'

export default  function Query({ project, query }) {
  if (!query || (query.trim().length === 0)) return (<Error statusCode={400} />)

  return (
    <Papers
      pg="Query"
      project={project}
      display={`Search Results for Your Keyword: ${query}`}
      query={query}
    />
  )
}