import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 px-4 text-center">
      <p className="text-gray-600 mb-2">Copyright © 2023 dbmsProject</p>
      <nav className="mb-4">
        <ul className="list-none">
          <li className="inline-block mx-2">
            <a className="text-gray-600 hover:text-gray-900" href="#">Terms of Use</a>
          </li>
          <li className="inline-block mx-2">
            <a className="text-gray-600 hover:text-gray-900" href="#">Privacy Policy</a>
          </li>
          <li className="inline-block mx-2">
            <a className="text-gray-600 hover:text-gray-900" href="/feedback">Feedback</a>
          </li>
        </ul>
      </nav>
      <p className="text-gray-600">Designed and developed by 210701080 and 210701118</p>
    </footer>
  );
};

export default Footer;
