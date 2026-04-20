import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from '../../services/api';

function VehicleDetail() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    API.get(`/vehicles/${id}`)
      .then(res => setVehicle(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!vehicle) return <p>Chargement...</p>;

  return (
    <div className="container mt-4">

      {/* INFOS VEHICULE */}
      <div className="card mb-4">
        <div className="card-body">
          <h3>{vehicle.brand} {vehicle.model}</h3>
          <p><strong>Immatriculation:</strong> {vehicle.number}</p>
          <p><strong>Année:</strong> {vehicle.year}</p>
        </div>
      </div>

      {/* CLIENT */}
      {vehicle.customer && (
        <div className="card mb-4">
          <div className="card-header">
            <h5>Propriétaire</h5>
          </div>
          <div className="card-body">
            <p>
              {vehicle.customer.lastname} {vehicle.customer.firstname}
            </p>
            <p>{vehicle.customer.phone}</p>
          </div>
        </div>
      )}

      {/* REPARATIONS */}
      <div className="card mt-4">
        <div className="card-header d-flex justify-content-between">
            <h5>Historique des réparations</h5>
            <button className="btn btn-primary btn-sm">+ Ajouter</button>
        </div>

        <div className="card-body">
            <table className="table table-striped">
            <thead>
                <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Statut</th>
                <th>Prix</th>
                </tr>
            </thead>
            <tbody>
                {vehicle.repairs?.map(r => (
                <tr key={r.id}>
                    <td>{r.date}</td>
                    <td>
                    <strong></strong><br/>
                    <small></small>
                    </td>
                    <td>
                    <span className={
                        r.status === 'terminé'
                        ? 'badge bg-success'
                        : 'badge bg-warning'
                    }>
                        {r.status}
                    </span>
                    </td>
                    <td>{r.total} Ar</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>

    </div>
  );
}

export default VehicleDetail;