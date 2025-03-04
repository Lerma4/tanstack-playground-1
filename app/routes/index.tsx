import { createFileRoute } from '@tanstack/react-router'
import Container from 'react-bootstrap/esm/Container'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <Container className='py-4'>
      <h3>Welcome Home!!!</h3>
    </Container>
  )
}
