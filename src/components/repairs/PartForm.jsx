import React, { useState } from "react";

const PartForm = ({
  show,
  setShow,
  formData,
  setFormData
}) => {

  const [currentPart, setCurrentPart] = useState({
    name: '',
    quantity: 1,
    price: 0
  });

  const handleAdd = () => {
    if (!currentPart.name) return;

    setFormData(prev => ({
      ...prev,
      parts: [...prev.parts, currentPart]
    }));

    // reset
    setCurrentPart({
      name: '',
      quantity: 1,
      price: 0
    });

    setShow(false);
  };

  const totalLine = currentPart.quantity * currentPart.price;

  return (
    <div className="card mb-3">
      <div className="card-body">

        <h5>Pièces</h5>

        {!show && (
          <button
            className="btn btn-primary btn-sm mb-2"
            onClick={() => setShow(true)}
          >
            + Pièce
          </button>
        )}

        {show && (
          <>
            {/* NOM */}
            <input
              className="form-control mb-2"
              placeholder="Nom de la pièce"
              value={currentPart.name}
              onChange={(e) =>
                setCurrentPart(prev => ({
                  ...prev,
                  name: e.target.value
                }))
              }
            />

            {/* QUANTITE */}
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Quantité"
              value={currentPart.quantity}
              onChange={(e) =>
                setCurrentPart(prev => ({
                  ...prev,
                  quantity: parseInt(e.target.value) || 1
                }))
              }
            />

            {/* PRIX */}
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Prix unitaire"
              value={currentPart.price}
              onChange={(e) =>
                setCurrentPart(prev => ({
                  ...prev,
                  price: parseFloat(e.target.value) || 0
                }))
              }
            />

            {/* TOTAL LIGNE */}
            <div className="mb-3 text-end">
              <small className="text-muted">
                Total ligne : <strong>{totalLine} Ar</strong>
              </small>
            </div>

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

export default PartForm;