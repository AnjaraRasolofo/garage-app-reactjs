import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const TotalActionsBar = ({ total, formData, setFormData }) => {

  const handleReset = () => {
    if (!window.confirm("Réinitialiser ?")) return;

    setFormData({
      vehicle_id: '',
      vehicle: '',
      client: '',
      date: '',
      status: 'pending',
      lines: [],
      parts: []
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("FACTURE", 14, 15);

    autoTable(doc, {
      startY: 30,
      head: [["Travail", "Coût", "Technicien", "Heures"]],
      body: formData.lines.map(l => [
        l.custom_title,
        l.labor_cost,
        l.technician,
        l.hours
      ])
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Pièce", "Qté", "Prix", "Total"]],
      body: formData.parts.map(p => [
        p.name,
        p.quantity,
        p.price,
        p.quantity * p.price
      ])
    });

    doc.text(`TOTAL: ${total} Ar`, 14, doc.lastAutoTable.finalY + 20);

    doc.save("facture.pdf");
  };

  return (
    <div className="card">
      <div className="card-body d-flex justify-content-between align-items-center">

        <h4>Total : {total} Ar</h4>

        <div className="d-flex gap-2">

          <button className="btn btn-outline-secondary" onClick={handleReset}>
            Annuler
          </button>

          <button className="btn btn-danger" onClick={generatePDF}>
            Export PDF
          </button>

          <button className="btn btn-success">
            Enregistrer
          </button>

        </div>

      </div>
    </div>
  );
};

export default TotalActionsBar;