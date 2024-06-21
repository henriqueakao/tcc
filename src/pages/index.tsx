import React from 'react';
import Layout from '../components/layout';
import ListingCard from '../components/listingCard';
import  { Image } from 'react-bootstrap';

const Home: React.FC = () => {

  return (
    <Layout>
      <div className="position-relative">
        <Image className="homepage-image" src="images/HomePagePictureRatio.jpg" fluid style={{ width: '100%' }} />
        <div className="image-text-overlay">
          <h1>Welcome to GreenTide</h1>
          <p>Connecting buyers and sellers of carbon credits to promote sustainability.</p>
        </div>
      </div>
      <ListingCard listings={[]}  />
    </Layout>
  );
};

export default Home;
