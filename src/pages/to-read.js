import Error from 'next/error'
import Papers from '../components/Papers'

export default  function ToRead({ project }) {
  if (project === null) return (<Error statusCode={400} />)

  return (
    <Papers
      pg="To-Read"
      project={project}
      display="Papers on Your To-Read List"
    />
  )
}