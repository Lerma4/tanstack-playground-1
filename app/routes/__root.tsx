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
            <Navbar.Brand>Dogana Test</Navbar.Brand>
            <Nav className="me-auto">
              <Link
                to="/"
                className="nav-link"
                activeProps={{
                  className: 'nav-link active'
                }}
                activeOptions={{ exact: true }}
              >
                Home
              </Link>
              <Link
                to="/imp"
                className="nav-link"
                activeProps={{
                  className: 'nav-link active'
                }}
              >
                Importazioni
              </Link>
              <Link
                to="/breed"
                className="nav-link"
                activeProps={{
                  className: 'nav-link active'
                }}
              >
                Dog Breeds
              </Link>
              <Link
                to="/users"
                className="nav-link"
                activeProps={{
                  className: 'nav-link active'
                }}
              >
                Users
              </Link>
              <Link
                to="/user-table"
                className="nav-link"
                activeProps={{
                  className: 'nav-link active'
                }}
              >
                Users Table
              </Link>
              <Link
                to="/posts"
                className="nav-link"
                activeProps={{
                  className: 'nav-link active'
                }}
              >
                Posts
              </Link>
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
