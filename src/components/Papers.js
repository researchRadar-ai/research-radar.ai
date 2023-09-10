import Head from 'next/head'
import Header from '../components/Header'
import { useRouter } from 'next/navigation'
import {
  VStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator,
  Heading, Text, HStack, Button
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

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
// const papers = [text, text, text, text, text, text, text, text, text, text]

export default function Papers({ project, pg, display }) {
  const router = useRouter()

  const [papers, setPapers] = useState([text]); // array of papers

  useEffect(() => {
    if (pg == "Saved"){
      fetch('/api/project/list_papers', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project_id: project.id,
          type: 'saved',
        }),
      })
        .then(response => response.json())
        .then(data => setPapers(data));
    }
    else if (pg == "To-Read"){
      fetch('/api/project/list_papers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project_id: project.id,
          type: 'toread',
        }),
      })
        .then(response => response.json())
        .then(data => setPapers(data));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Research Radar | {pg}</title>
        <meta name="description" content="Reimagining Research." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main>
        <Header />
        <VStack px="5%" py={8} spacing={6} bg="#FEFCFB">
          <Breadcrumb w="100%">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">All</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as="button" onClick={() => router.back()}>{project.name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink as="button" disabled>{pg}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading as="h2" fontSize="48px" w="100%">{display}</Heading>
          <VStack w="100%" spacing={8}>
            {papers.map(({ id, title, authors, year, journal, abstract }) => (
              <VStack w="100%" spacing={4} key={id}>
                <Heading as="h3" color="#034078" fontFamily="'Yantramanav', sans-serif" w="100%">{title}</Heading>
                <Text w="100%">{authors}</Text>
                <Text w="100%">{`${journal}, ${year}`}</Text>
                <Text w="100%">{abstract}</Text>
                <HStack w="100%" spacing={4}>
                  <Button variant="brightBg">Read Now</Button>
                  <Button variant="mdDarkFont">Read Later</Button>
                </HStack>
              </VStack>
            ))}
          </VStack>
          <Button variant="brightBg" onClick={() => { router.back() }}>Back</Button>
        </VStack>
      </main>
    </>
  )
}