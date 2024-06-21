import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Collapse, Badge } from 'react-bootstrap';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import NewListingModal from './newListingModal';
import { Listing } from '../models/listing';

interface ListingCardProps {
  listings: Listing[];
}

const ListingCard: React.FC<ListingCardProps> = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleToggle = (key: string) => {
    setExpanded(expanded === key ? null : key);
  };

  const getCreditTypeColor = (creditType: string): string => {
    switch (creditType) {
      case 'FOREST_CONSERVATION':
        return 'success';
      case 'RENEWABLE_ENERGY':
        return 'primary';
      case 'ENERGY_EFFICIENCY':
        return 'secondary';
      case 'WASTE_MANAGEMENT':
        return 'warning';
      case 'OTHER':
        return 'info';
      default:
        return 'secondary';
    }
  };

  const getCreditTypeDescription = (type: string) => {
    switch (type) {
      case 'RENEWABLE_ENERGY':
        return 'Energia Sustentável';
      case 'FOREST_CONSERVATION':
        return 'Reflorestamento';
      case 'ENERGY_EFFICIENCY':
        return 'Eficiência Energética';
      case 'WASTE_MANAGEMENT':
        return 'Redução de Resíduos';
      case 'OTHER':
        return 'Agro';
      default:
        return 'Unknown';
    }
  };

  useEffect(() => {
    fetch('http://localhost:8080/carboncredit')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map((credit: any) => ({
          key: credit.id,
          companyName: credit.owner,
          contactEmail: 'esg@cba.com.br',
          status: 'online',
          expandedDescription: credit.detailedDescription,
          lastOnline: credit.lastOnline || '',
          creditType: credit.categoryName,
          amount: credit.amount,
          price: `$${credit.categoryPrice}/ton`
        }));
        setListings(formattedData);
      })
      .catch(error => {
        console.error('Houve um erro com a requisição:', error);
      });
  }, []);

  const handleSave = async (newListing: Listing) => {
    try {
      const response = await fetch('http://localhost:8080/carboncredit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newListing),
      });

      if (response.ok) {
        const newCredit = await response.json();
        const newListingFormatted: Listing = {
          key: newCredit.id,
          companyName: newCredit.owner,
          contactEmail: 'esg@cba.com.br',
          status: 'online',
          expandedDescription: newCredit.detailedDescription,
          lastOnline: newCredit.lastOnline || '',
          creditType: newCredit.categoryName,
          amount: newCredit.amount,
          price: `$${newCredit.categoryPrice}/ton`
        };
        setListings([...listings, newListingFormatted]);
        setShowModal(false);
      } else {
        console.error('Failed to create a new listing');
      }
    } catch (error) {
      console.error('Error while creating a new listing', error);
    }
  };

  const handleDelete = async (key: string) => {
    try {
      const response = await fetch(`http://localhost:8080/carboncredit/${key}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setListings(listings.filter((listing) => listing.key !== key));
      } else {
        console.error('Failed to delete the item');
      }
    } catch (error) {
      console.error('Error while deleting the item', error);
    }
  };

  return (
    <div className="card bg-dark text-white">
      <div className="card-body">
        <Row className="align-items-center mb-3 border-bottom">
          <Col xs={4} className="border-end"><strong>Projeto</strong></Col>
          <Col xs={3} className="border-end"><strong>Disponível</strong></Col>
          <Col xs={2} className="border-end"><strong>Tipo de Crédito</strong></Col>
          <Col xs={2}><strong>Ações</strong></Col>
          <Col xs={1} className="text-end">
            <Button variant="primary" className="align-self-center" onClick={() => setShowModal(true)}>Vender</Button>
          </Col>
        </Row>

        {listings.map((listing) => (
          <div key={listing.key}>
            <Row className="align-items-center mb-3">
              <Col xs={1} className="border-end">
                <img src="images/logo.jpeg" alt={`${listing.companyName} logo`} className="img-fluid" />
              </Col>
              <Col xs={3} className="border-end">
                <strong>{listing.companyName}</strong>
                <br />
                <a href={`mailto:${listing.contactEmail}`} className="text-white">
                  {listing.contactEmail}
                </a>
              </Col>
              <Col xs={3} className="border-end">
                <Badge bg={listing.status === 'online' ? 'success' : 'secondary'}>
                  {listing.status === 'online' ? 'Online' : 'Offline'}
                </Badge>
                <br />
                {listing.status === 'offline' && (
                  <small>Last online: {listing.lastOnline}</small>
                )}
              </Col>
              <Col xs={2} className="border-end">
                <Badge bg={getCreditTypeColor(listing.creditType)}>{getCreditTypeDescription(listing.creditType)}</Badge>
              </Col>
              <Col xs={3} className="d-flex justify-content-between align-items-center">
                <strong>{listing.price}</strong>
                <br />
                <Button variant="primary" size="sm" className="me-2" onClick={() => handleDelete(listing.key)}>
                  Comprar
                </Button>
                <Button variant="link" onClick={() => handleToggle(listing.key)} className="text-white">
                  {expanded === listing.key ? <FaArrowUp /> : <FaArrowDown />}
                </Button>
              </Col>
            </Row>
            <Collapse in={expanded === listing.key}>
              <div>
                <hr className="divider-small" />
                <Row>
                  <Col xs={{ span: 10, offset: 1 }}>
                    <p>{listing.expandedDescription}</p>
                  </Col>
                </Row>
              </div>
            </Collapse>
            {listing.key !== listings[listings.length - 1].key && <hr />}
          </div>
        ))}
      </div>
      <NewListingModal show={showModal} handleClose={() => setShowModal(false)} handleSave={handleSave} />
    </div>
  );
};

export default ListingCard;
