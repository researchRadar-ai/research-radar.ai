import Error from 'next/error'
import Papers from '../components/Papers'

export default  function Recommended({ project }) {
  if (project === null) return (<Error statusCode={400} />)

  return (
    <Papers
      pg="Recommended"
      project={project}
      display="Your Recommended Papers"
    />
  )
}