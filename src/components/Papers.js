import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Header from '../components/Header'
import { useRouter } from 'next/router'
import {
  VStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator,
  Heading, Text, HStack, Button
} from '@chakra-ui/react'

const PER_PAGE = 5;

export default function Papers({ project, pg, display, query }) {
  const router = useRouter()

  const [papers, setPapers] = useState([]); // array of papers

  useEffect(() => {
    if (pg === "Saved"){
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
    else if (pg === "To-Read"){
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
    else if (pg === "Query") {
      console.log('<------', query);
    
      // Construct the query parameters string
      let params = new URLSearchParams({
        "project_id": project !== null ? project.id : null,
        "query": query,
      });
    
      fetch('/api/search?' + params.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => setPapers(data));
    }
    else if (pg === "Recommended"){
      fetch('/api/project/list_papers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project_id: project.id,
          type: 'recommend',
        }),
      })
        .then(response => response.json())
        .then(data => setPapers(data));
    }
    
  }, []);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(papers.length / PER_PAGE);
  const displayedPapers = papers.length > 5 ? papers.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE) : papers;

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
            {project !== null ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">All</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink as="button" onClick={() => router.back()}>{project.name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink as="button" disabled>{pg}</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )
            : (<BreadcrumbItem>
                <BreadcrumbLink href="/">Query</BreadcrumbLink>
              </BreadcrumbItem>
            )
          }
          </Breadcrumb>
          <Heading as="h2" fontSize="48px" w="100%">{display}</Heading>
        <VStack key={currentPage} px="5%" py={8} spacing={6} bg="#FEFCFB">
          <VStack w="100%" spacing={8}>
            {displayedPapers.length > 0 ? displayedPapers.map(({ id, title, authors, year, journal, abstract }) => (
              <VStack w="100%" spacing={4} key={id}>
                <Heading as="h3" color="#034078" fontFamily="'Yantramanav', sans-serif" w="100%">{title}</Heading>
                <Text w="100%" as='i' color='#0A1128'>{authors}</Text>
                <Text w="100%" as='b' color='#034078'>{`${journal}, ${year}`}</Text>
                <Text w="100%">{abstract}</Text>
                <HStack w="100%" spacing={4}>
                  <Button variant="brightBg">Read Now</Button>
                  <Button variant="mdDarkFont">Read Later</Button>
                </HStack>
              </VStack>
            )) : null }
          </VStack>
          <HStack spacing={4} mt={4}>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <Button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              variant={idx + 1 === currentPage ? "brightBg" : "mdDarkFont"}
            >
              {idx + 1}
            </Button>
          ))}
        </HStack>
          </VStack>
          <Button variant="brightBg" onClick={() => { router.back() }}>Back</Button>
        </VStack>
      </main>
    </>
  )
}