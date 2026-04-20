import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import './RepairForm.css';

import RepairInfoForm from './RepairInfoForm';
import VehicleInfoCard from './VehicleInfoCard';
import WorkForm from './WorkForm';
import PartForm from './PartForm';
import RepairLinesTable from './RepairLinesTable';
import PartsTable from './PartsTable';
import TotalActionsBar from './TotalActionsBar';

const RepairForm = () => {

  const [vehicles, setVehicles] = useState([]);
  const [workTemplate, setWorkTemplate] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [showWorkForm, setShowWorkForm] = useState(false);
  const [showPartForm, setShowPartForm] = useState(false);

  const [formData, setFormData] = useState({
    vehicle_id: '',
    vehicle: '',
    client: '',
    date: '',
    status: 'pending',
    lines: [],
    parts: []
  });

  const [currentWorkLine, setCurrentWorkLine] = useState({
  template_id: null,
  custom_title: '',
  labor_cost: '',
  technician: '',
  employee_id: null,
  hours: ''
});

  const fetchVehicles = () => {
    API.get("/vehicles").then((res) => {
      console.log("VEHICLES:", res.data);

      setVehicles(
        Array.isArray(res.data)
          ? res.data
          : res.data.data || []   // 🔥 fallback important
      );
    });
  };

  const fetchWorkTemplates = () => {
    API.get("/work-task-templates/list").then(r => setWorkTemplate(r.data));
  };

  

  const fetchEmployees = () => {
    API.get("/employees").then((res) => {
      setEmployees(
        Array.isArray(res.data)
          ? res.data
          : res.data.data || []
      );
    });
  };

  const handleVehicleChange = (e) => {
  const vehicleId = Number(e.target.value); // 🔥 IMPORTANT

  const selectedVehicle = vehicles.find(
    (v) => v.id === vehicleId
  );

  setFormData(prev => ({
    ...prev,
    vehicle_id: vehicleId,
    vehicle: selectedVehicle,
    client: selectedVehicle?.customer
      ? `${selectedVehicle.customer.firstname} ${selectedVehicle.customer.lastname}`
      : ""
  }));
};

  

  useEffect(() => {
    fetchVehicles();
    fetchWorkTemplates();
    fetchEmployees();

    /*if (id) {
      fetchRepair();
    }*/
  }, []);

  const total = [
    ...formData.lines.map(l => Number(l.labor_cost)),
    ...formData.parts.map(p => p.quantity * p.price)
  ].reduce((a,b) => a+b, 0);

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h2 className="mb-4 text-end border-bottom pb-2">
          Réparation de véhicule
        </h2> 
        <div className="row">

          {/* LEFT */}
          <div className="col-md-8">

            <VehicleInfoCard formData={formData} />

            <RepairLinesTable formData={formData} />

            <PartsTable formData={formData} />

            <TotalActionsBar
              total={total}
              formData={formData}
              setFormData={setFormData}
            />

          </div>

          {/* RIGHT */}
          <div className="col-md-4">

            <RepairInfoForm
              formData={formData}
              setFormData={setFormData}
              vehicles={vehicles}
              handleVehicleChange={handleVehicleChange}
            />

            <WorkForm
              isOpen={showWorkForm}
              setIsOpen={setShowWorkForm}
              currentWorkLine={currentWorkLine}
              setCurrentWorkLine={setCurrentWorkLine}
              workTemplate={workTemplate}
              employees={employees}  
            />

            <PartForm
              show={showPartForm}
              setShow={setShowPartForm}
              formData={formData}
              setFormData={setFormData}
            />

          </div>

        </div>

      </div>
    </div>
  );
};

export default RepairForm;