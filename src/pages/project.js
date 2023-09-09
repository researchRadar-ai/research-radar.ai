import Error from 'next/error'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Button, Heading, VStack, Grid, GridItem, Card, CardHeader, CardBody, Flex, Box,
  Input, HStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import Header from '../components/Header'

const text = {
  id: 123,
  title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  authors: 'No name author, No name author, No name author, No name author',
  year: 2023,
  journal: 'Super prestigious journal',
  abstract: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Turpis in eu mi bibendum neque egestas. Diam ut venenatis tellus in metus.
  Dignissim cras tincidunt lobortis feugiat vivamus. Morbi tincidunt augue
  interdum velit. Ut enim blandit volutpat maecenas volutpat. Lacus vel
  facilisis volutpat est velit egestas. Quis enim lobortis scelerisque
  fermentum dui faucibus in. Volutpat est velit egestas dui id. Nunc consequat
  interdum varius sit. Ultricies integer quis auctor elit sed vulputate mi sit.
  Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui. Dolor magna
  eget est lorem. Ornare quam viverra orci sagittis eu. Bibendum ut tristique et
  egestas quis ipsum suspendisse ultrices gravida. Semper eget duis at tellus at
  urna. Maecenas pharetra convallis posuere morbi leo urna molestie at. Leo urna
  molestie at elementum eu facilisis.`
}
const recommended = [text, text, text, text, text]
const saved = [text, text, text, text, text]
const toRead = [text, text, text, text, text]
const groupings = [{ display: 'Your Recommended Articles', obj: recommended},
{ display: 'Your Saved Articles', obj: saved },
{ display: 'Your To-Read Articles', obj: toRead }]


export default function Project({ project, setProject }) {
  if (project == null) return (<Error statusCode={400} />)
  const router = useRouter()

  return (
    <main>
      <Header />
      <VStack px="5%" py={8} spacing={6} bg="#FEFCFB">
        <Breadcrumb w="100%">
          <BreadcrumbItem>
            <BreadcrumbLink as="button" onClick={() => router.back()}>All</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink as="button" disabled>{project.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Grid w="100%" templateColumns="6fr 4fr">
          <GridItem>
            <Heading as="h2" fontSize="48px">{project.name}</Heading>
          </GridItem>
          <GridItem display="flex" alignItems="center">
            <Input placeholder="Type a keyword to search" />
          </GridItem>
        </Grid>
        {groupings.map(({ display, obj }) => (
          <VStack w="100%" spacing={2} key={display} display="flex" justifyContent="start">
            <Flex w="100%" justifyContent="space-between">
              <Heading as="h3" alignSelf="start" color="#034078">{display}</Heading>
              <Button>View All</Button>
            </Flex>
            <Grid
              w="100%"
              overflowX="auto"
              overflowY="hidden"
              py={4}
              templateColumns="repeat(3, 400px)"
              templateRows="500px"
              autoColumns="400px"
              autoFlow="column"
              bg="#FEFCFB"
            >
            {obj.map(({ id, title, authors, year, journal, abstract }) => (
              <GridItem h="100%" key={id} alignItems="center" justifyContent="center" display="flex" position="relative"
              >
                <Card
                  h="100%"
                  w="85%"
                  position="absolute"
                >
                  <CardHeader position="relative">
                    <Heading as="h4" color="#001F54" fontSize="24px" w="90%">{title}</Heading>
                    <AddIcon boxSize={4} position="absolute" top={8} right={8} />
                  </CardHeader>
                  <CardBody h="100%" overflowY="hidden" mb={8}>
                    {abstract}
                  </CardBody>
                </Card>
              </GridItem>
            ))}
            </Grid>
          </VStack>))}
        <Button onClick={() => { setProject(null); router.back() }}>Back</Button>
      </VStack>
    </main>
  )
}