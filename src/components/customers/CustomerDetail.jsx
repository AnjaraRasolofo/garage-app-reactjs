import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from '../../services/api';

function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    API.get(`/customers/${id}`)
      .then(res => setCustomer(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!customer) return <p>Chargement...</p>;

  return (
    <div className="container mt-4">

        {/* HEADER CLIENT */}
        <div className="card mb-4">
            <div className="card-body">
                <h3>{customer.lastname} {customer.firstname}</h3>
                <p><strong>Type:</strong> {customer.type}</p>
                <p><strong>Téléphone:</strong> {customer.phone}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Adresse:</strong> {customer.address}</p>

                
                <Link to={`/customers/${customer.id}`} className="btn btn-warning me-2">
                    Modifier
                    </Link> 
                <button className="btn btn-success">Nouvelle facture</button>
                <button
                    type="button"
                    className="btn btn-secondary mx-2"
                    onClick={() => navigate('/customers')}
                    >
                    Précédent
                </button>
            </div>
        </div>

        {/* VEHICULES */}
        <div className="card mb-4">
            <div className="card-header d-flex justify-content-between">
            <h5>Véhicules</h5>
            <button className="btn btn-primary btn-sm">+ Ajouter</button>
            </div>
            <div className="card-body">
            <table className="table">
                <thead>
                <tr>
                    <th>Marque</th>
                    <th>Modèle</th>
                    <th>Immatriculation</th>
                </tr>
                </thead>
                <tbody>
                {customer.vehicles?.map(v => (
                    <tr key={v.id}>
                    <td>{v.brand}</td>
                    <td>{v.model}</td>
                    <td><a href={`/vehicle/${v.id}`} className="text-decoration-none">
                        {v.number}
                    </a></td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>

        {/* FACTURES */}
        <div className="card">
            <div className="card-header">
            <h5>Factures</h5>
            </div>
            <div className="card-body">
            <table className="table">
                <thead>
                <tr>
                    <th>Numéro</th>
                    <th>Date</th>
                    <th>Montant</th>
                </tr>
                </thead>
                <tbody>
                {customer.invoices?.map(inv => (
                    <tr key={inv.id}>
                    <td>{inv.number}</td>
                    <td>{inv.date}</td>
                    <td>{inv.total} Ar</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>

    </div>
  );
}

export default CustomerDetail;