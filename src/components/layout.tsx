import React, { ReactNode } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Project TCC</title>
        <meta name="description" content="Facilitating the connection between carbon credit buyers and sellers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar bg="#50727B" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link href="/" legacyBehavior>
              <a className="navbar-brand">Project TCC</a>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" legacyBehavior>
                <a className="nav-link">Home</a>
              </Link>
              <Link href="/calculator" legacyBehavior>
                <a className="nav-link">Calculator</a>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="my-4">
        {children}
      </Container>
    </>
  );
};

export default Layout;
