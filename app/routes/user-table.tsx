import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import UserTable from '../components/UserTable'
import { usersQueryOptions } from '../utils/users'
import { useState } from 'react'
import { Form, Row, Col, InputGroup, Pagination } from 'react-bootstrap'

export const Route = createFileRoute('/user-table')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(usersQueryOptions())
  },
  component: UserTablePage,
})

function UserTablePage() {
  const usersQuery = useSuspenseQuery(usersQueryOptions())
  const [filters, setFilters] = useState({
    id: '',
    name: '',
    email: '',
  })
  const [page, setPage] = useState(1)
  const [orderBy, setOrderBy] = useState<{
    field: keyof typeof filters
    direction: 'asc' | 'desc'
  }>({ field: 'id', direction: 'asc' })

  const ITEMS_PER_PAGE = 5

  const filteredUsers = usersQuery.data
    .filter((user) => {
      return (
        user.id.toString().includes(filters.id) &&
        user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        user.email.toLowerCase().includes(filters.email.toLowerCase())
      )
    })
    .sort((a, b) => {
      const field = orderBy.field
      const direction = orderBy.direction === 'asc' ? 1 : -1
      return a[field] > b[field] ? direction : -direction
    })

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)

  return (
    <div className="p-4">
      <h1 className="mb-4">Users Table</h1>
      
      <Form className="mb-3">
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Filter by ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ID"
                value={filters.id}
                onChange={(e) => setFilters({ ...filters, id: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Filter by Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Filter by Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={filters.email}
                onChange={(e) => setFilters({ ...filters, email: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <UserTable 
        users={paginatedUsers}
        onSort={(field) => {
          setOrderBy(prev => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
          }))
        }}
        sortConfig={orderBy}
      />

      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
          <Pagination.Prev onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} />
          
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pagination.Item 
              key={index + 1} 
              active={index + 1 === page}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          
          <Pagination.Next onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
          <Pagination.Last onClick={() => setPage(totalPages)} disabled={page === totalPages} />
        </Pagination>
      </div>
    </div>
  )
}
