// components/SearchModal.jsx
'use client';

import { useState } from 'react';
import { Modal, Form, ListGroup, InputGroup } from 'react-bootstrap';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { BsCrosshair } from 'react-icons/bs';
import { lawyerData } from '@/data/lawyerData';

export default function SearchModal({ show, handleClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
    const filtered = lawyerData.filter((item) =>
      item.toLowerCase().includes(keyword.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="custom-modal"
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      <Modal.Header
        closeButton
        style={{
          borderBottom: 'none',
          padding: '10px 15px',
          backgroundColor: '#f8f9fa',
        }}
      >
        <Modal.Title
          className="w-100 text-center"
          style={{ fontSize: '18px', color: '#1a3c8b', fontWeight: 'bold' }}
        >
          Search for lawyers
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '15px 20px' }}>
        {/* Location Field */}
        <div style={{ marginBottom: '15px' }}>
          <InputGroup>
            <InputGroup.Text
              style={{
                backgroundColor: '#fff',
                border: '1px solid #ced4da',
                borderRight: 'none',
                padding: '8px 10px',
              }}
            >
              <FaMapMarkerAlt style={{ color: '#f5a623', fontSize: '16px' }} />
            </InputGroup.Text>
            <Form.Control
              style={{
                border: '1px solid #ced4da',
                borderLeft: 'none',
                borderRight: 'none',
                padding: '8px 10px',
                fontSize: '14px',
              }}
              placeholder="City"
              defaultValue="Karachi"
            />
            <button
              className="btn"
              style={{
                backgroundColor: '#f8f9fa',
                border: '1px solid #ced4da',
                borderLeft: 'none',
                padding: '8px 15px',
                fontSize: '14px',
                color: '#1a3c8b',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <BsCrosshair style={{ marginRight: '5px', fontSize: '16px' }} />
              Detect
            </button>
          </InputGroup>
        </div>

        {/* Search Input */}
        <InputGroup style={{ marginBottom: '15px' }}>
          <InputGroup.Text
            style={{
              backgroundColor: '#fff',
              border: '1px solid #ced4da',
              padding: '8px 10px',
            }}
          >
            <FaSearch style={{ color: '#6c757d', fontSize: '16px' }} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search for lawyers, law firms"
            value={searchTerm}
            onChange={handleSearch}
            style={{
              border: '1px solid #ced4da',
              padding: '8px 10px',
              fontSize: '14px',
              color: '#6c757d',
            }}
          />
        </InputGroup>

        {/* List Items */}
        <ListGroup style={{ maxHeight: '280px', overflowY: 'auto' }}>
          {(searchTerm && results.length === 0) ? (
            <div
              className="text-center text-muted"
              style={{ marginTop: '15px', fontSize: '14px' }}
            >
              No results found.
            </div>
          ) : (
            (searchTerm ? results : lawyerData).map((item, idx) => (
              <ListGroup.Item
                key={idx}
                action
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 15px',
                  border: 'none',
                  borderBottom: '1px solid #e9ecef',
                  fontSize: '14px',
                  backgroundColor: 'transparent',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FaSearch
                    style={{ marginRight: '10px', color: '#6c757d', fontSize: '16px' }}
                  />
                  {item}
                </div>
                <span style={{ color: '#6c757d', fontSize: '12px' }}>Specialty</span>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}