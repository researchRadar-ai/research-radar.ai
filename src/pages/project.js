import Error from 'next/error'
import { useRouter } from 'next/navigation'
import { Button } from '@chakra-ui/react'

export default function Project({ projectId, setProjectId }) {
  if (projectId == null) return (<Error statusCode={400} />)
  const router = useRouter()

  return (
    <Button onClick={() => { setProjectId(null); router.back() }}>Back</Button>
  )
}