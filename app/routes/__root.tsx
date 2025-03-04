import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import * as React from 'react'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export const Route = createRootRouteWithContext<{
  queryClient: QueryClient

}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link>
                <Link
                  to="/"
                  activeProps={{
                    className: 'font-bold',
                  }}
                  activeOptions={{ exact: true }}
                >
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/posts"
                  activeProps={{
                    className: 'font-bold',
                  }}
                >
                  Posts
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/users"
                  activeProps={{
                    className: 'font-bold',
                  }}
                >
                  Users
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/route-a"
                  activeProps={{
                    className: 'font-bold',
                  }}
                >
                  Pathless Layout
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/deferred"
                  activeProps={{
                    className: 'font-bold',
                  }}
                >
                  Deferred
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  // @ts-expect-error
                  to="/this-route-does-not-exist"
                  activeProps={{
                    className: 'font-bold',
                  }}
                >
                  This Route Does Not Exist
                </Link>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  )
}
