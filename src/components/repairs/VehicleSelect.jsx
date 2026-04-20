import Select from "react-select";

const VehicleSelect = ({ vehicles, formData, setFormData }) => {

  const options = vehicles.map(v => ({
    value: v.id,
    label: `${v.brand} ${v.model} - ${v.number} - ${v.customer?.firstname} ${v.customer?.lastname}`,
    vehicle: v
  }));

  const handleChange = (selected) => {
    if (!selected) return;

    const v = selected.vehicle;

    setFormData(prev => ({
      ...prev,
      vehicle_id: v.id,
      vehicle: v,
      client: v.customer
        ? `${v.customer.firstname} ${v.customer.lastname}`
        : ""
    }));
  };

  return (
    <Select
      options={options}
      placeholder="🔍 Rechercher un véhicule..."
      onChange={handleChange}
      isClearable
      className="mb-2"
    />
  );
};

export default VehicleSelect;