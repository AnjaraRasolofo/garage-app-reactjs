import React, { useState } from "react";

const WorkForm = ({
  show,
  setShow,
  formData,
  setFormData,
  currentWorkLine,
  setCurrentWorkLine,
  workTemplate,
  employees
}) => {
/*
  const [currentWorkLine, setCurrentWorkLine] = useState({
    template_id: null,
    custom_title: '',
    labor_cost: '',
    technician: '',
    hours: ''
  });*/

  const handleAdd = () => {
    if (!currentWorkLine.custom_title) return;

    setFormData(prev => ({
      ...prev,
      lines: [...prev.lines, currentWorkLine]
    }));

    // reset
    setCurrentWorkLine({
      template_id: null,
      custom_title: '',
      labor_cost: '',
      technician: '',
      hours: ''
    });

    setShow(false);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5>Travaux</h5>

        {!show && (
          <button
            className="btn btn-primary btn-sm mb-2"
            onClick={() => setShow(true)}
          >
            + Travail
          </button>
        )}

        {show && (
          <>
            {/* TEMPLATE */}
            <select
              className="form-control mb-2"
              value={currentWorkLine.template_id || ""}
              onChange={(e) => {
                const id = Number(e.target.value);

                const template = workTemplate.find(t => t.id === id);

                setCurrentWorkLine(prev => ({
                  ...prev,
                  template_id: id,
                  custom_title: template?.title || '',
                  labor_cost: template?.defaultLaborCost || ''
                }));
              }}
            >
              <option value="">-- Choisir un travail --</option>
              {workTemplate.map(t => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>

            {/* DESCRIPTION */}
            <textarea
              className="form-control mb-2"
              rows={2}
              placeholder="Description"
              value={currentWorkLine.custom_title}
              onChange={(e) =>
                setCurrentWorkLine(prev => ({
                  ...prev,
                  custom_title: e.target.value
                }))
              }
            />

            {/* COUT */}
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Coût"
              value={currentWorkLine.labor_cost}
              onChange={(e) =>
                setCurrentWorkLine(prev => ({
                  ...prev,
                  labor_cost: e.target.value
                }))
              }
            />

            {/* TECHNICIEN */}

            <select
              className="form-control mb-2"
              value={currentWorkLine.employee_id || ""}
              onChange={(e) => {
                const employeeId = Number(e.target.value);

                const selected = employees.find(emp => emp.id === employeeId);

                setCurrentWorkLine(prev => ({
                  ...prev,
                  employee_id: employeeId,
                  technician: selected
                    ? `${selected.firstname} ${selected.lastname}`
                    : ""
                }));
              }}
            >
              <option value="">-- Choisir un technicien --</option>

              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstname} {emp.lastname}
                </option>
              ))}
            </select>

            {/* HEURES */}
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Heures"
              value={currentWorkLine.hours}
              onChange={(e) =>
                setCurrentWorkLine(prev => ({
                  ...prev,
                  hours: e.target.value
                }))
              }
            />

            {/* ACTIONS */}
            <div className="d-flex gap-2">
              <button
                className="btn btn-success btn-sm"
                onClick={handleAdd}
              >
                Ajouter
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setShow(false)}
              >
                Annuler
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default WorkForm;