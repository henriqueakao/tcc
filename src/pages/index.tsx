import React from 'react';
import Layout from '../components/layout';
import ListingCard from '../components/listingCard';
import  { Image } from 'react-bootstrap';

const Home: React.FC = () => {
  const listings = [
    {
      key: 1,
      title: 'Exemplo 1',
      description: 'Descrição curta do exemplo 1',
      expandedDescription: 'Descrição detalhada do exemplo 1',
      companyLogo: '/images/logo1.png',
      companyName: 'Empresa 1',
      contactEmail: 'contato@empresa1.com',
      status: 'online',
      lastOnline: '',
      creditType: 'Reflorestamento',
      price: '$100/lote',
    },
    {
      key: 2,
      title: 'Exemplo 2',
      description: 'Descrição curta do exemplo 2',
      expandedDescription: 'Descrição detalhada do exemplo 2',
      companyLogo: '/images/logo2.png',
      companyName: 'Empresa 2',
      contactEmail: 'contato@empresa2.com',
      status: 'offline',
      lastOnline: '2 days ago',
      creditType: 'Redução de Emissões',
      price: '$150/lote',
    },
    {
      key: 3,
      title: 'Exemplo 3',
      description: 'Descrição curta do exemplo 3',
      expandedDescription: 'Descrição detalhada do exemplo 3',
      companyLogo: '/images/logo3.png',
      companyName: 'Empresa 3',
      contactEmail: 'contato@empresa3.com',
      status: 'online',
      lastOnline: '',
      creditType: 'Agro',
      price: '$120/lote',
    },
    {
      key: 4,
      title: 'Exemplo 4',
      description: 'Descrição curta do exemplo 4',
      expandedDescription: 'Descrição detalhada do exemplo 4',
      companyLogo: '/images/logo4.png',
      companyName: 'Empresa 4',
      contactEmail: 'contato@empresa4.com',
      status: 'offline',
      lastOnline: '1 day ago',
      creditType: 'Energia Sustentável',
      price: '$200/lote',
    },
    {
      key: 5,
      title: 'Exemplo 5',
      description: 'Descrição curta do exemplo 5',
      expandedDescription: 'Descrição detalhada do exemplo 5',
      companyLogo: '/images/logo5.png',
      companyName: 'Empresa 5',
      contactEmail: 'contato@empresa5.com',
      status: 'offline',
      lastOnline: '3 days ago',
      creditType: 'Reflorestamento',
      price: '$180/lote',
    },
    {
      key: 6,
      title: 'Exemplo 6',
      description: 'Descrição curta do exemplo 6',
      expandedDescription: 'Descrição detalhada do exemplo 6',
      companyLogo: '/images/logo6.png',
      companyName: 'Empresa 6',
      contactEmail: 'contato@empresa6.com',
      status: 'online',
      lastOnline: '',
      creditType: 'Redução de Emissões',
      price: '$250/lote',
    },
    {
      key: 7,
      title: 'Exemplo 7',
      description: 'Descrição curta do exemplo 7',
      expandedDescription: 'Descrição detalhada do exemplo 7',
      companyLogo: '/images/logo7.png',
      companyName: 'Empresa 7',
      contactEmail: 'contato@empresa7.com',
      status: 'online',
      lastOnline: '',
      creditType: 'Agro',
      price: '$300/lote',
    },
    {
      key: 8,
      title: 'Exemplo 8',
      description: 'Descrição curta do exemplo 8',
      expandedDescription: 'Descrição detalhada do exemplo 8',
      companyLogo: '/images/logo8.png',
      companyName: 'Empresa 8',
      contactEmail: 'contato@empresa8.com',
      status: 'offline',
      lastOnline: '4 days ago',
      creditType: 'Energia Sustentável',
      price: '$280/lote',
    },
  ];

  return (
    <Layout>
      <div className="position-relative">
        <Image className="homepage-image" src="images/HomePagePictureRatio.jpg" fluid style={{ width: '100%' }} />
        <div className="image-text-overlay">
          <h1>Welcome to Project TCC</h1>
          <p>Connecting buyers and sellers of carbon credits to promote sustainability.</p>
        </div>
      </div>
      <ListingCard listings={[]}  />
    </Layout>
  );
};

export default Home;
