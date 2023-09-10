import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Error from 'next/error'
import Head from 'next/head'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Button, Heading, VStack, Grid, GridItem, Card, CardHeader, CardBody, Flex, Box,
  Input, HStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator,
  Link, FormControl,
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



export default function Project({ project, setQuery }) {
  if (project === null) return (<Error statusCode={400} />)

  const router = useRouter()
  const { register, handleSubmit, formState: { errors }} = useForm({ mode: 'onSubmit '});

  const [saved, setSaved] = useState([]); // array of saved papers
  const [toRead, setToRead] = useState([]); // array of to read papers
  const [groupings, setGroupings] = useState([]); // list of groupings to organize data

  useEffect(() => {
    const fetchSavedData = async () => {
      const response = await fetch('/api/project/list_papers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project_id: project.id,
          type: 'saved',
        }),
      });
      return response.json();
    };

    const fetchToReadData = async () => {
      const response = await fetch('/api/project/list_papers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project_id: project.id,
          type: 'toread',
        }),
      });
      return response.json();
    };

    (async () => {
      try {
        const [toReadData, savedData] = await Promise.all([fetchToReadData(), fetchSavedData()]);
        setToRead(toReadData);
        setSaved(savedData);
      } catch(e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    setGroupings([
      { display: 'Your Recommended Articles', obj: recommended, href: '/recommended'},
      { display: 'Your Saved Articles', obj: saved, href: '/saved' },
      { display: 'Your To-Read Articles', obj: toRead, href: '/to-read' }
    ]);
  }, [saved, toRead]);

  const handleSearch = ({ query }) => {
    if (query.length > 0) {
      setQuery(query.trim());
      router.push('/query');
    }
  }

  return (
    <>
      <Head>
        <title>Research Radar | Projects</title>
        <meta name="description" content="Reimagining Research." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            <GridItem display="flex" alignItems="center" w="100%">
              <form onSubmit={handleSubmit(handleSearch)} style={{ width: '100%' }}>
                <FormControl display="flex" w="100%">
                  <Input
                    w="100%"
                    variant="custom"
                    isInvalid={errors}
                    placeholder="Type a keyword to search"
                    {...register("query", { required: false })}
                  />
                </FormControl>
              </form>
            </GridItem>
          </Grid>
          {groupings.map(({ display, obj, href }) => (
            <VStack w="100%" spacing={2} key={display} display="flex" justifyContent="start">
              <Flex w="100%" justifyContent="space-between">
                <Heading as="h3" alignSelf="start" color="#034078" fontFamily="'Yantramanav', sans-serif">{display}</Heading>
                <Link href={href} as={NextLink}>View All</Link>
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
                className="scrollCards"
              >
              {obj.length > 0 && obj.map(({ id, title, authors, year, journal, abstract }) => (
                <GridItem h="100%" key={id} alignItems="center" justifyContent="center" display="flex" position="relative"
                >
                  <Card
                    className="card"
                    h="100%"
                    w="85%"
                    position="absolute"
                    _hover={{ transform: 'scale(1.07)', cursor: 'pointer' }}
                  >
                    <CardHeader position="relative">
                      <Heading as="h4" color="#001F54" fontSize="24px" w="90%">{title}</Heading>
                      <AddIcon boxSize={4} position="absolute" top={8} right={8} />
                    </CardHeader>
                    <CardBody h="100%" overflowY="hidden" mb={8} position="relative">
                      {abstract}
                    </CardBody>
                    {/* <Button w="max-content" variant="darkBg" position="absolute" bottom={4} left="31%" >Read More</Button> */}
                  </Card>
                </GridItem>
              ))}
              {obj.length === 0 && (<Heading as="h4" color="#001F54" fontSize="24px">You currently don't have any articles under this category.</Heading>)}
              </Grid>
            </VStack>))}
          <Button variant="mdDarkFont" onClick={() => { router.back() }}>Back</Button>
        </VStack>
      </main>
    </>
  )
}