import React from 'react';
import {Link} from 'react-router-dom';
const Test = () => {
  return (
    <header>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/insert">Insert Data</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Test;