import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Card, CardBody, Heading, Grid, GridItem } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

const inter = Inter({ subsets: ['latin'] })

const projects = [{
  id: 1,
  name: 'Quantum Physics',
  imgUrl: '',
}, {
  id: 2,
  name: 'Machine Learning',
  imgUrl: '',
}]

export default function Home() {
  return (
    <>
      <Head>
        <title>Research Radar</title>
        <meta name="description" content="Reimagining Research." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Grid px="5%" py={12} templateColumns="repeat(3, 1fr)" templateRows="400px" autoRows="400px">
          {projects.map(({ id, name, imgUrl }) => (
            <GridItem key={id} alignItems="center" justifyContent="center" display="flex">
              <Card h="100%" w="85%" h="90%">
                <CardBody>
                  <Heading>{name}</Heading>
                </CardBody>
              </Card>
            </GridItem>
          ))}
          <GridItem alignItems="center" justifyContent="center" display="flex">
            <Card h="100%" w="85%" h="90%">
              <CardBody>
                <Grid h="100%" templateRows="7fr 3fr">
                  <GridItem display="flex" alignItems="center" justifyContent="center">
                    <AddIcon boxSize={12} />
                  </GridItem>
                  <GridItem display="flex" alignItems="start" justifyContent="center">
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
