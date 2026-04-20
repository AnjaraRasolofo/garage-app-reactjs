const PartsTable = ({ formData }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5>Pièces</h5>

        <table className="table">
          <thead>
            <tr>
              <th>Pièce</th>
              <th>Qté</th>
              <th>Prix</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {formData.parts.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.quantity}</td>
                <td>{p.price}</td>
                <td>{p.quantity * p.price}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default PartsTable;