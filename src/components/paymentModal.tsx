import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

interface CardData {
  id: string;
  number: string;
  name: string;
  expiry: string;
}

interface PaymentModalProps {
  show: boolean;
  handleClose: () => void;
  handlePayment: (selectedCard: string) => void;
  handleAddCard: (newCard: CardData) => void;
  cards: CardData[];
}

const PaymentModal: React.FC<PaymentModalProps> = ({ show, handleClose, handlePayment, handleAddCard, cards }) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [newCard, setNewCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [showNewCardForm, setShowNewCardForm] = useState(false);

  const handleCardSelect = (cardId: string) => {
    setSelectedCard(cardId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewCard({ ...newCard, [name]: value });
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Remove caracteres não numéricos
    const newValue = value.replace(/\D/g, '');

    // Formata o número do cartão com pontos a cada 4 dígitos
    const formattedValue = formatCardNumber(newValue);

    setNewCard({ ...newCard, [name]: formattedValue });
  };

  const formatCardNumber = (value: string) => {
    // Adiciona pontos a cada 4 dígitos
    return value.replace(/(\d{4})/g, '$1 ').trim();
  };

  const handleAddNewCard = () => {
    const formattedCardNumber = newCard.number.replace(/\d(?=\d{4})/g, '*');
    const newCardData: CardData = {
      id: Math.random().toString(36).substr(2, 9), // Geração de ID temporário
      number: formattedCardNumber,
      name: newCard.name,
      expiry: newCard.expiry,
    };
    handleAddCard(newCardData); // Adicionar novo cartão à lista
    setSelectedCard(newCardData.id); // Selecionar o novo cartão automaticamente
    setShowNewCardForm(false); // Fechar o formulário de novo cartão
  };

  const handlePaymentClick = () => {
    if (selectedCard) {
      handlePayment(selectedCard); // Chama a função handlePayment com o cartão selecionado
      setSelectedCard(null); // Limpa o cartão selecionado após ação de pagamento
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className='card-color'>
        <Modal.Title>Selecione um Cartão de Crédito</Modal.Title>
      </Modal.Header>
      <Modal.Body className='card-color'>
        <div className="card-color mb-3">
          {cards.map((card) => (
            <div key={card.id} className={`mb-3 d-flex align-items-center justify-content-between ${selectedCard === card.id ? 'selected-card' : ''}`}>
              <div>
                <strong>{card.number}</strong>
                <br />
                <small>{card.name}</small>
                <br />
                <small>Expira em: {card.expiry}</small>
              </div>
              <Button variant="primary" onClick={() => handleCardSelect(card.id)} disabled={selectedCard === card.id}>
                {selectedCard === card.id ? 'Selecionado' : 'Selecionar'}
              </Button>
            </div>
          ))}
          {showNewCardForm && (
            <Form>
              <Form.Group className="mb-3" controlId="formCardNumber">
                <Form.Label>Número do Cartão</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o número do cartão"
                  name="number"
                  value={newCard.number}
                  onChange={handleCardInputChange}
                  maxLength={19}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCardName">
                <Form.Label>Nome do Titular</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome do titular"
                  name="name"
                  value={newCard.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formCardExpiry">
                  <Form.Label>Data de Expiração</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="MM/AA"
                    name="expiry"
                    value={newCard.expiry}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formCardCVV">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="CVV"
                    name="cvv"
                    value={newCard.cvv}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Row>
              <Button variant="primary" onClick={handleAddNewCard}>
                Adicionar Cartão
              </Button>
            </Form>
          )}
          <hr />
          <p className="text-center mb-0">
            <Button variant="link" onClick={() => setShowNewCardForm(!showNewCardForm)}>
              <FaPlus /> Adicionar Novo Cartão
            </Button>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className='card-color'>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handlePaymentClick} disabled={!selectedCard}>
          Comprar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
