'use client';

import { useState } from 'react';
import { Modal, Form, ListGroup, InputGroup } from 'react-bootstrap';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { BsCrosshair } from 'react-icons/bs';

const lawyerData = [
  "Criminal Lawyer",
  "Family Lawyer",
  "Corporate Lawyer",
  "Divorce Lawyer",
  "Civil Lawyer",
  "Property Lawyer",
  "Cyber Crime Lawyer",
  "Tax Lawyer",
  "Immigration Lawyer",
  "Banking Lawyer",
  "Employment Lawyer",
  "Intellectual Property Lawyer",
];

export default function SearchModal({ show, handleClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
    const filtered = lawyerData.filter(item =>
      item.toLowerCase().includes(keyword.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center fs-5">Search for lawyers</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {/* Location Field */}
        <div className="mb-3">
          <InputGroup>
            <InputGroup.Text className="bg-white border-end-0">
              <FaMapMarkerAlt />
            </InputGroup.Text>
            <Form.Control
              className="border-start-0 border-end-0"
              placeholder="City"
              defaultValue="Karachi"
            />
            <button className="btn btn-light">
              <BsCrosshair className="me-1" />
              Detect
            </button>
          </InputGroup>
        </div>

        {/* Search Input */}
        <InputGroup>
          <InputGroup.Text className="bg-white">
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search for lawyers, law firms, services…"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>

        {/* List Items */}
        <ListGroup className="mt-3" style={{ maxHeight: '280px', overflowY: 'auto' }}>
          {(searchTerm && results.length === 0) ? (
            <div className="text-center text-muted mt-3">No results found.</div>
          ) : (
            (searchTerm ? results : lawyerData).map((item, idx) => (
              <ListGroup.Item
                key={idx}
                className="d-flex justify-content-between align-items-center"
                action
              >
                <div className="d-flex align-items-center">
                  <FaSearch className="me-2 text-muted" />
                  {item}
                </div>
                <span className="text-muted">Specialty</span>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>

      </Modal.Body>
    </Modal>
  );
}
