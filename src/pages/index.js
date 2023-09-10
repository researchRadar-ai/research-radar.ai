import Head from 'next/head'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Card, CardBody, Heading, Grid, GridItem, Image } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
// import aiImg from '../../public/AI.jpeg'
// import quantumPhysics from '../../public/QuantumPhysics.jpeg'
import { useEffect, useState } from 'react';


const inter = Inter({ subsets: ['latin'] })

// const projects = [{
//   id: 1,
//   name: 'Quantum Physics',
//   imgUrl: quantumPhysics,
// }, {
//   id: 2,
//   name: 'Machine Learning',
//   imgUrl: "/AI.jpeg",
// }]

export default function Home({ project, setProject }) {
  const router = useRouter()

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/project/list_projects')
      .then(response => response.json())  // First, convert the response to JSON
      .then(data => setProjects(data));   // Then, set the state with that JSON data
  }, []);


  return (
    <>
      <Head>
        <title>Research Radar | Home</title>
        <meta name="description" content="Reimagining Research." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Heading bg="#FEFCFB" pt={6} as="h2" fontSize="48px" px="5%">Your Research Projects</Heading>
        <Grid px="5%" pb={12} templateColumns="repeat(3, 1fr)" templateRows="400px" autoRows="400px" bg="#FEFCFB">
          {projects.map(({ id, name, imgUrl }) => (
            <GridItem key={id} alignItems="center" justifyContent="center" display="flex">
              <Card
                h="100%"
                w="85%"
                h="90%"
                onClick={() => { setProject({ id, name, imgUrl }); router.push('/project')} }
                cursor="pointer"
                _hover={{ transform: 'scale(1.07)' }}
                className="card"
              >
                <CardBody>
                  <Grid h="100%" templateRows="7fr 3fr">
                    <GridItem w="100%" h="100%" position="relative">
                      <NextImage src={imgUrl} alt={name} fill />
                    </GridItem>
                    <GridItem display="flex" alignItems="center">
                      <Heading as="h3" fontFamily="'Yantramanav', sans-serif" color="#034078">{name}</Heading>
                    </GridItem>
                  </Grid>
                </CardBody>
              </Card>
            </GridItem>
          ))}
          <GridItem alignItems="center" justifyContent="center" display="flex">
            <Card
              h="100%"
              w="85%"
              h="90%"
              onClick={() => router.push('/create')}
              cursor="pointer"
              _hover={{ transform: 'scale(1.07)' }}
              className="card"
            >
              <CardBody>
                <Grid h="100%" templateRows="7fr 3fr">
                  <GridItem display="flex" alignItems="center" justifyContent="center">
                    <AddIcon boxSize={12} color="#001F54" />
                  </GridItem>
                  <GridItem display="flex" alignItems="center" justifyContent="center">
                    Create a new project
                  </GridItem>
                </Grid>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </main>
    </>
  )
}
