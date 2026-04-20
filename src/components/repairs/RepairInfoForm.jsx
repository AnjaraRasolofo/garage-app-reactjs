import React from "react";
import VehicleSelect from "./VehicleSelect";

const RepairInfoForm = ({
  formData,
  setFormData,
  vehicles,
  handleVehicleChange
}) => {

  const formatOptionLabel = ({ label }) => (
    <div>
        <strong>{label.split(" - ")[0]}</strong>
        <div style={{ fontSize: "0.8rem", color: "#777" }}>
        {label.split(" - ").slice(1).join(" - ")}
        </div>
    </div>
    );
  
    const options = Array.isArray(vehicles)
    ? vehicles.map(v => ({
        value: v.id,
        label: `${v.brand} ${v.model} - ${v.number} - ${v.customer?.firstname} ${v.customer?.lastname}`,
        vehicle: v
        }))
    : [];

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5>Saisie Info</h5>

        {/* VEHICULE */}
        <VehicleSelect
            vehicles={vehicles}
            formData={formData}
            options={options}
            formatOptionLabel={formatOptionLabel}
            setFormData={setFormData}
        />

        {/* DATE */}
        <input
          type="date"
          className="form-control mb-2"
          value={formData.date || ""}
          onChange={(e) =>
            setFormData(prev => ({
              ...prev,
              date: e.target.value
            }))
          }
        />

        {/* STATUS */}
        <select
          className="form-control"
          value={formData.status}
          onChange={(e) =>
            setFormData(prev => ({
              ...prev,
              status: e.target.value
            }))
          }
        >
          <option value="pending">En attente</option>
          <option value="in_progress">En cours</option>
          <option value="done">Terminé</option>
          <option value="cancelled">Annulé</option>
        </select>

      </div>
    </div>
  );
};

export default RepairInfoForm;