import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

const CarbonCalculator: React.FC = () => {
  const [formData, setFormData] = useState({
    kwh: '',
    gasm3: '',
    gasBotijao: '',
    litrosGasolina: '',
    litrosGNV: '',
    litrosEtanol: ''
  });

  const [result, setResult] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.emissaoTotal);
      } else {
        console.error('Erro na requisição');
      }
    } catch (error) {
      console.error('Erro na requisição', error);
    }
  };

  return (
    <div className="bg-dark text-white p-4 rounded">
      <h3>Calculadora de Crédito de Carbono</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formKwh" className="mb-3">
              <Form.Label>Consumo de energia (kWh)</Form.Label>
              <Form.Control
                type="number"
                name="kwh"
                value={formData.kwh}
                onChange={handleChange}
                placeholder="Digite o consumo de energia"
                required
                className="bg-dark text-white"
              />
            </Form.Group>
            <Form.Group controlId="formGasm3" className="mb-3">
              <Form.Label>Consumo de gás natural (m³)</Form.Label>
              <Form.Control
                type="number"
                name="gasm3"
                value={formData.gasm3}
                onChange={handleChange}
                placeholder="Digite o consumo de gás natural"
                required
                className="bg-dark text-white"
              />
            </Form.Group>
            <Form.Group controlId="formGasBotijao" className="mb-3">
              <Form.Label>Consumo de gás de botijão</Form.Label>
              <Form.Control
                type="number"
                name="gasBotijao"
                value={formData.gasBotijao}
                onChange={handleChange}
                placeholder="Digite o consumo de gás de botijão"
                required
                className="bg-dark text-white"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formLitrosGasolina" className="mb-3">
              <Form.Label>Litros gasolina</Form.Label>
              <Form.Control
                type="number"
                name="litrosGasolina"
                value={formData.litrosGasolina}
                onChange={handleChange}
                placeholder="Digite os litros de gasolina"
                required
                className="bg-dark text-white"
              />
            </Form.Group>
            <Form.Group controlId="formLitrosGNV" className="mb-3">
              <Form.Label>Litros de GNV</Form.Label>
              <Form.Control
                type="number"
                name="litrosGNV"
                value={formData.litrosGNV}
                onChange={handleChange}
                placeholder="Digite os litros de GNV"
                required
                className="bg-dark text-white"
              />
            </Form.Group>
            <Form.Group controlId="formLitrosEtanol" className="mb-3">
              <Form.Label>Litros de etanol</Form.Label>
              <Form.Control
                type="number"
                name="litrosEtanol"
                value={formData.litrosEtanol}
                onChange={handleChange}
                placeholder="Digite os litros de etanol"
                required
                className="bg-dark text-white"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Calcular
        </Button>
      </Form>
      {result !== null && (
        <div className="mt-4">
          <h4>Emissão Total de Carbono: {result} kg CO2e</h4>
        </div>
      )}
    </div>
  );
};

export default CarbonCalculator;
