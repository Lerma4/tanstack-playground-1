import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'redaxios'

interface DogBreed {
  id: string
  type: string
  attributes: {
    name: string
    description: string
    hypoallergenic: boolean
  }
}

interface DogApiResponse {
  data: DogBreed[]
  links: {
    self: string
    current: string
    next: string
    last: string
  }
}

export const Route = createFileRoute('/breed/')({
  component: BreedComponent,
})

function BreedComponent() {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['dogBreeds'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 3000))
      const { data } = await axios.get<DogApiResponse>('https://dogapi.dog/api/v2/breeds')
      return data
    },
    refetchOnMount: true // Refetch every time the component mounts
  })

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Dog Breeds</h2>
          {data?.links && (
            <small className="text-muted">
              Page {data.links.current.split('page[number]=')[1]} of {data.links.last.split('page[number]=')[1]}
            </small>
          )}
        </div>
        <Button 
          variant="outline-primary"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? (
            <Spinner 
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
          ) : (
            <i className="fa fa-refresh me-2"></i>
          )}
          Refresh
        </Button>
      </div>
      
      <ListGroup>
        {data?.data.map((breed) => (
          <ListGroup.Item 
            key={breed.id}
            className="d-flex justify-content-between align-items-start p-4"
          >
            <div className="ms-2 me-auto w-100">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="mb-0">{breed.attributes.name}</h4>
                <div>
                  <Badge bg="secondary" className="me-2">ID: {breed.id.slice(0, 8)}...</Badge>
                  <Badge bg="secondary" className="me-2">Type: {breed.type}</Badge>
                  {breed.attributes.hypoallergenic && (
                    <Badge bg="info" pill>
                      Hypoallergenic
                    </Badge>
                  )}
                </div>
              </div>
              <p className="mb-0 mt-2">{breed.attributes.description}</p>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {data?.links && (
        <div className="d-flex justify-content-between mt-3">
          <Button
            variant="outline-primary"
            disabled={!data.links.current.includes('page[number]=1')}
            onClick={() => {/* Add pagination logic */}}
          >
            Previous
          </Button>
          <Button
            variant="outline-primary"
            disabled={data.links.current === data.links.last}
            onClick={() => {/* Add pagination logic */}}
          >
            Next
          </Button>
        </div>
      )}
    </Container>
  )
}
