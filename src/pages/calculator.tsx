import React, { useState } from 'react';
import Layout from '../components/layout';
import { Form, Button, Row, Col } from 'react-bootstrap';
import CarbonCalculator from 'src/components/carbonCalculator';

const Calculator: React.FC = () => {
  
  return (
    <Layout>
      <CarbonCalculator />
    </Layout>
  );
};

export default Calculator;
