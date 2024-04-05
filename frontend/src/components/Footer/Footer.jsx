import React from 'react';
import './Footer.css';

const Footer = () => {
  const renderColumn = (title) => (
    <div className="column__container">
      <h4 className="title__column">{title}</h4>
      <ul className="items__container">
        {[...Array(4)].map((_, index) => (
          <li key={index} className="item">
            item
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="footer__container">
      {renderColumn('Title column')}
      {renderColumn('Title column')}
      {renderColumn('Title column')}
    </div>
  );
};

export default Footer;
