const RepairLinesTable = ({ formData }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5>Travaux</h5>

        <table className="table">
          <thead>
            <tr>
              <th>Travail</th>
              <th>Coût</th>
              <th>Technicien</th>
              <th>Heures</th>
            </tr>
          </thead>

          <tbody>
            {formData.lines.map((l, i) => (
              <tr key={i}>
                <td>{l.custom_title}</td>
                <td>{l.labor_cost}</td>
                <td>{l.technician}</td>
                <td>{l.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default RepairLinesTable;