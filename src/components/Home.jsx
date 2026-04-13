import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, ListGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import API from "../services/api";

const Home = () => {
  const token = localStorage.getItem("token");

  const [employees, setEmployees] = useState([]);
  const [searchEmployee, setSearchEmployee] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const [customers, setCustomers] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const [repFilter, setRepFilter] = useState('day');
  const [stockStats, setStockStats] = useState({
    out_of_stock: 0,
    low_stock: 0,
    total_parts: 0
  });
  const [searchPart, setSearchPart] = useState("");
  const [partsResults, setPartsResults] = useState([]);

  const [searchInvoice, setSearchInvoice] = useState("");
  const [invoiceResults, setInvoiceResults] = useState([]);


  const handleEmployeeSearch = async (e) => {
    const value = e.target.value;
    setSearchEmployee(value);

    if (value.trim() === "") {
      setFilteredEmployees([]); // vide si rien tapé
      return;
    }

    try {
      const res = await API.get(`/employees/search?query=${value}`);
      setFilteredEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCustomerSearch = async (e) => {
    const value = e.target.value;
    setSearchCustomer(value);

    if (value.trim() === "") {
      setFilteredCustomers([]);
      return;
    }

    try {
      const res = await API.get(`/customers/search?query=${value}`);
      setFilteredCustomers(res.data);
    } catch (err) {
      console.error(err);
      setFilteredCustomers([]);
    }
  };

  const handlePartSearch = async (e) => {
    const value = e.target.value;
    setSearchPart(value);

    if (value.trim() === "") {
      setPartsResults([]);
      return;
    }

    try {
      const res = await API.get(`/parts/search?query=${value}`);
      setPartsResults(res.data);
    } catch (err) {
      console.error(err);
      setPartsResults([]);
    }
  };

  const handleInvoiceSearch = async (e) => {
    const value = e.target.value;
    setSearchInvoice(value);

    if (value.trim() === "") {
      setInvoiceResults([]);
      return;
    }

    try {
      const res = await API.get(`/invoices/search?query=${value}`);
      setInvoiceResults(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setInvoiceResults([]);
    }
  };
  
  const fetchStockStats = async () => {
    try {
      const res = await API.get('/dashboard/stock');
      setStockStats(res.data);
    } catch (error) {
      console.error("Error fetching parts stats:", error);
    }
  };

  useEffect(() => {
    
    //fetchEmployees();
    fetchStockStats();   

  }, []);

  // Gestion employés
  const totalCount = employees.length;
  const availableCount = (employees || []).filter(e => e.status === 'available').length;
  const onLeaveCount = (employees || []).filter(e => e.status === 'on_leave').length;

  
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Bienvenue dans Garage Manager</h1>
      <Row>
        {/* Gestion des employés */}
        <Col md={6}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>
                Gestion des employés 
                <img 
                  src="/images/employes.png" 
                  alt="employes"
                  style={{ width: '56px', height: '56px', marginLeft: '12px', objectFit: 'contain' }}
                />
              </Card.Title>
              <Form.Control
                type="text"
                placeholder="Rechercher par nom, poste ou compétence"
                value={searchEmployee}
                onChange={handleEmployeeSearch}
                className="mb-3"
              />
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Badge bg="success">{availableCount} disponibles</Badge>
                <Button variant="outline-success" size="sm">
                  Voir les dispo
                </Button>
              </div>
              <ListGroup className="mb-3">
                {searchEmployee.trim() !== "" && filteredEmployees.length === 0 && (
                  <ListGroup.Item>Aucun résultat</ListGroup.Item>
                )}
                {searchEmployee.trim() !== "" &&
                  filteredEmployees.map((emp) => (
                    <ListGroup.Item
                      key={emp.id}
                      className="d-flex justify-content-between"
                    >
                      <div>
                        <strong>{emp.firstname} {emp.lastname}</strong> — {emp.function}
                      </div>
                      <Button variant="link" size="sm">
                        Détails
                      </Button>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
              <div>
                <p> Employés total : <strong>{totalCount}</strong></p>
                <p> En congé : <strong className="text-danger">{onLeaveCount}</strong></p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Gestion des clients */}
        <Col md={6}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>
                Gestion des clients 
                <img 
                  src="/images/public-service.png" 
                  alt="clients"
                  style={{ width: '56px', height: '56px', marginLeft: '12px', objectFit: 'contain' }}
                />
              </Card.Title>
              <Form.Control
                type="text"
                placeholder="Rechercher par nom, immatriculation, téléphone ou email"
                value={searchCustomer}
                onChange={handleCustomerSearch}
                className="mb-3"
              />
              <Dropdown className="mb-2">
                <Dropdown.Toggle size="sm" variant="secondary">
                  Historique : {repFilter === 'day' ? 'Aujourd’hui' : repFilter === 'week' ? 'Semaine' : 'Mois'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setRepFilter('day')}>Aujourd’hui</Dropdown.Item>
                  <Dropdown.Item onClick={() => setRepFilter('week')}>Cette semaine</Dropdown.Item>
                  <Dropdown.Item onClick={() => setRepFilter('month')}>Ce mois</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <ListGroup className="mb-3">

                {searchCustomer.trim() !== "" && filteredCustomers.length === 0 && (
                  <ListGroup.Item>Aucun client trouvé</ListGroup.Item>
                )}

                {searchCustomer.trim() !== "" &&
                  filteredCustomers.map((client) => (
                    <ListGroup.Item
                      key={client.id}
                      action
                      as={Link}
                      to={`/customers/${client.id}`}
                    >
                      <strong>{client.firstname} {client.lastname}</strong><br />
                      {client.phone} • {client.email} <br />
                      Nombre de véhicules : <strong>{client.vehiclesCount || 0}</strong><br />
                      Réparations en cours : <strong>{client.repairsInProgress || 0}</strong><br />
                      Factures impayées : <strong>{client.unpaidInvoices || 0}</strong>
                    </ListGroup.Item>
                  ))
                }

            </ListGroup>
              <div className="text-muted text-sm">
                <p> Véhicules réparés : <strong>0</strong>< br/></p>
                <p> Total des véhicules : 0</p>
              </div>
            </Card.Body>
          </Card>
        </Col>



        {/* Gestion des pièces détachées */}
        <Col md={6}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>
                Stock pièces détachées
                <img 
                  src="/images/piece-detachee.png" 
                  alt="clients"
                  style={{ width: '56px', height: '56px', marginLeft: '12px', objectFit: 'contain' }}
                />
              </Card.Title>
              <Form.Control
                type="text"
                placeholder="Rechercher par désignation ..."
                value={searchPart}
                onChange={handlePartSearch}
                className="mb-3"
              />
              <ListGroup className="mb-3">
                {searchPart.trim() !== "" && partsResults.length === 0 && (
                  <ListGroup.Item>Aucune pièce trouvée</ListGroup.Item>
                )}

                {searchPart.trim() !== "" &&
                  partsResults.map((part) => (
                    <ListGroup.Item
                      key={part.id}
                      className="d-flex justify-content-between align-items-center"
                      action
                      as={Link}
                      to={`/parts/${part.id}`}
                    >
                      <div>
                        <strong>{part.name}</strong>
                        <div className="text-muted small">
                          Ref: {part.reference}
                        </div>
                      </div>

                      <div>
                        {part.quantity === 0 ? (
                          <span className="badge bg-danger">Rupture</span>
                        ) : part.quantity <= part.minQuantity ? (
                          <span className="badge bg-warning text-dark">Faible stock</span>
                        ) : null}
                      </div>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
              <div className="text-muted text-sm">
                <p> Total stock : {stockStats.total_parts || 0}</p>
                <p> Faible quantité : {stockStats.low_stock || 0}</p>
                <p> Rupture : <strong className="text-danger">{stockStats.out_of_stock || 0}</strong></p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Stat des factures */}
        <Col md={6}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>
                Factures
                <img 
                  src="/images/facture-dachat.png" 
                  alt="clients"
                  style={{ width: '56px', height: '56px', marginLeft: '12px', objectFit: 'contain' }}
                />
              </Card.Title>
              <Form.Control
                type="text"
                placeholder="Rechercher par numéro de facture, nom du client ou immatriculation"
                value={searchInvoice}
                onChange={handleInvoiceSearch}
                className="mb-3"
              />
              <ListGroup className="mb-3">
                {searchInvoice.trim() !== "" && invoiceResults.length === 0 && (
                  <ListGroup.Item>Aucune facture trouvée</ListGroup.Item>
                )}

                {searchInvoice.trim() !== "" &&
                  invoiceResults.map((inv) => (
                    <ListGroup.Item key={inv.id}>
                      <strong>Facture #{inv.invoiceNumber}</strong><br />
                      Client : {inv.customerFirstName} {inv.customerLastName}<br />
                      Immatriculation : {inv.vehicleNumber}<br />
                      Montant : {inv.total} Ar
                    </ListGroup.Item>
                  ))}
              </ListGroup>
              <div className="text-muted text-sm">
                <p> Brouillons : <strong bg="secondary">0</strong></p>
                <p> Payées : <strong bg="success">0</strong></p>
                <p> Impayées : <strong bg="danger">0</strong></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
