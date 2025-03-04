import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

interface ImpState {
  ambiente: '0' | '1'
  modoDichiarazione: 'S' | 'N'
  svincoloUnico: '0' | '1'
  preClearing: '0' | '1'
  tipoBolla: 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'H7'
  inRettifica: boolean
}

export const Route = createFileRoute('/imp/')({
  component: ImpComponent,
})

function ImpComponent() {
  const { register, handleSubmit, watch } = useForm<ImpState>({
    defaultValues: {
      ambiente: '0',
      modoDichiarazione: 'S',
      svincoloUnico: '0',
      preClearing: '0',
      tipoBolla: 'H1',
      inRettifica: false
    }
  })

  const tipoBolla = watch('tipoBolla')
  const inRettifica = watch('inRettifica')

  const onSubmit = async (data: ImpState) => {
    console.log('Form submitted:', data)
  }

  const handleArticoli = () => {
    console.log('Opening articoli')
  }

  const handleVerifica = () => {
    handleSubmit(onSubmit)()
  }

  const handleInviaDichiarazione = async () => {
    handleSubmit(onSubmit)()
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-4">
          <Col>
            <Navbar bg="light" expand="lg">
              <Container>
                <Nav className="me-auto">
                  <span className="me-2 fw-bold navbar-text">{tipoBolla}</span>
                  {inRettifica && (
                    <span className="me-2 fw-bold text-warning navbar-text">IN RETTIFICA</span>
                  )}
                </Nav>
                <div className="d-flex gap-2">
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={handleArticoli}
                    type="button"
                  >
                    <i className="fa fa-list-alt"></i> Articoli (ALT+i)
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={handleVerifica}
                    type="button"
                  >
                    <i className="fa fa-check"></i> Verifica
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    type="submit"
                  >
                    <i className="fa fa-save"></i> Salva
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    type="submit"
                  >
                    Salva e chiudi
                  </Button>
                  <Button 
                    variant="warning" 
                    size="sm"
                    onClick={handleInviaDichiarazione}
                    type="button"
                  >
                    Invia Dichiarazione <i className="fa fa-paper-plane"></i>
                  </Button>
                </div>
              </Container>
            </Navbar>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={2}>
            <Form.Group>
              <Form.Label className="text-danger">Ambiente</Form.Label>
              <Form.Select 
                disabled
                {...register('ambiente')}
              >
                <option value="0">PRODUZIONE</option>
                <option value="1">TEST</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Modo dichiarazione</Form.Label>
              <Form.Select 
                disabled
                {...register('modoDichiarazione')}
              >
                <option value="S">Unico invio</option>
                <option value="N">Invii multipli</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Svincolo unico</Form.Label>
              <Form.Select
                {...register('svincoloUnico')}
              >
                <option value="0">No. Uno svincolo per articolo</option>
                <option value="1">Si. Un solo svincolo per bolla</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Pre-clearing</Form.Label>
              <Form.Select
                {...register('preClearing')}
              >
                <option value="0">NO</option>
                <option value="1">SI</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Form.Group>
              <Form.Label>Tipo bolla</Form.Label>
              <Form.Select 
                disabled
                {...register('tipoBolla')}
              >
                <option value="H1">H1 Dichiarazione di immissione in libera pratica e regime speciale</option>
                <option value="H2">H2 Deposito doganale</option>
                <option value="H3">H3 Ammissione temporanea</option>
                <option value="H4">H4 Perfezionamento attivo</option>
                <option value="H5">H5 Introduzione di merci nel quadro degli scambi</option>
                <option value="H6">H6 Dichiarazioni in dogana nel traffico postale</option>
                <option value="H7">H7 Dichiarazioni in dogana per spedizioni bassi valori</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </form>
    </Container>
  )
}
