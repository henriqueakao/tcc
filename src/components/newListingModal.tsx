import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface NewListingModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave: (newListing: any) => void;
}

const NewListingModal: React.FC<NewListingModalProps> = ({ show, handleClose, handleSave }) => {
  const [newListing, setNewListing] = useState({
    owner: 'CBA',
    contactEmail: 'esg@cba.com.br',
    categoryName: '',
    detailedDescription: '',
    amount: '',
    categoryPrice: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewListing({ ...newListing, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave(newListing);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} className="modal-dark">
      <Modal.Header closeButton className="card-color text-white">
        <Modal.Title>Vender Crédito</Modal.Title>
      </Modal.Header>
      <Modal.Body className="card-color text-white">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCategoryName" className="mb-3">
            <Form.Label>Tipo de Crédito</Form.Label>
            <Form.Control
              as="select"
              name="categoryName"
              value={newListing.categoryName}
              onChange={handleChange}
              required
              className="bg-dark text-white"
            >
              <option value="">Selecione...</option>
              <option value="OTHER">Agro</option>
              <option value="FOREST_CONSERVATION">Conservação Florestal</option>
              <option value="ENERGY_EFFICIENCY">Eficiência Energética</option>
              <option value="RENEWABLE_ENERGY">Energia Renovável</option>
              <option value="WASTE_MANAGEMENT">Gestão de Resíduos</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formAmount" className="mb-3">
            <Form.Label>Quantidade</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={newListing.amount}
              onChange={handleChange}
              placeholder="Quantidade de Créditos"
              required
              className="bg-dark text-white"
            />
          </Form.Group>
          <Form.Group controlId="formCategoryPrice" className="mb-3">
            <Form.Label>Preço por Lote</Form.Label>
            <Form.Control
              type="number"
              name="categoryPrice"
              value={newListing.categoryPrice}
              onChange={handleChange}
              placeholder="Preço por Lote"
              required
              className="bg-dark text-white"
            />
          </Form.Group>
          <Form.Group controlId="formDetailedDescription" className="mb-3">
                <Form.Label>Descrição Detalhada</Form.Label>
                <Form.Control
                as="textarea"
                name="detailedDescription"
                value={newListing.detailedDescription}
                onChange={handleChange}
                placeholder="Digite uma descrição detalhada"
                className="bg-dark text-white"
                />
            </Form.Group>
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewListingModal;
