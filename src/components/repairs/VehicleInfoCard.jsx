const VehicleInfoCard = ({ formData }) => {
    
    const statusLabels = {
        pending: "En attente",
        in_progress: "En cours",
        done: "Terminé",
        cancelled: "Annulé"
    };

    const statusColors = {
        pending: "secondary",
        in_progress: "warning",
        done: "success",
        cancelled: "danger"
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5>Informations</h5>

                <p><strong>Véhicule :</strong> {formData.vehicle?.number || "-"}</p>
                <p><strong>Client :</strong> {formData.client}</p>
                <p>
                    <strong>Date :</strong>{" "}
                    {formData.date
                        ? new Date(formData.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })
                        : "-"}
                </p>
                <p>
                    <strong>Status :</strong>{" "}
                    <span
                    className={`badge bg-${statusColors[formData.status] || "secondary"} status-badge`}>
                        {statusLabels[formData.status] || "-"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default VehicleInfoCard;