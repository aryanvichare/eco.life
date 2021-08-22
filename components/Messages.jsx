import React from "react";

export const ErrorMessage = ({ title }) => {
  return (
    <div className="bg-primary-red py-16">
      <div className="text-center text-white">
        <h3 className="text-xl font-bold">{title}</h3>
        <p>
          Click here to suggest sustainable vendors or brands for us to add.
        </p>
      </div>
    </div>
  );
};

export const SuccessMessage = ({ title }) => {
  return (
    <div className="bg-primary py-16">
      <div className="text-center text-white">
        <h3 className="text-xl font-bold">{title}</h3>
        <p>
          Click here to suggest sustainable vendors or brands for us to add.
        </p>
      </div>
    </div>
  );
};
