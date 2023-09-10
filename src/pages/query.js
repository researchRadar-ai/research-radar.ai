import Head from 'next/head'
import Papers from '../components/Papers'

export default  function Query({ project, query }) {
  if (query === null) return (<Error statusCode={400} />)
  const display = `Search Results for Your Keyword: ${query}`;

  return (
    <Papers
      pg="Query"
      project={project}
      display={display}
      query={query}
    />
  )
}