import Error from 'next/error'
import Papers from '../components/Papers'

export default  function Saved({ project }) {
  if (project == null) return (<Error statusCode={400} />)

  return (
    <Papers
      pg="Saved"
      project={project}
      display="Your Saved Papers"
    />
  )
}