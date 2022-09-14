// * @Author: Ismail Debele Asega
// * @Email: asega03@gmail.com
// * @LinkedIn: https://www.linkedin.com/in/asegaismail/
// * @Github: https://github.com/ismailasega
// * @GitLab: https://gitlab.com/asegaismail
// * @Tel: +256-784-491412 / +256-756-454376

import React from "react";

/**
 * Declaring type of props
 *
 */
type dateView = {
  title: string;
  date: string;
};

const SelectedDateDetails: React.FC<dateView> = (props) => {
  return (
    <div className="selectedDetails">
      <div className="eventHeader">
        <strong>{props.title}</strong>
        <span>{props.date}</span>
      </div>
      <div className="eventsText">
        <p>No Events Scheduled</p>
      </div>
    </div>
  );
};

export default SelectedDateDetails;
