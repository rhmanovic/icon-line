// Categories.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import "../style/CategoryNavbar.css";
// import "../style/App.css";

import { BASE_URL } from "../config";
import { YOUR_MERCHANT_ID } from "../config";

function Categories({ language }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/merchant/${YOUR_MERCHANT_ID}`)
      .then((response) => {
        const { categories } = response.data;
        setCategories(categories);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCategoryClick = (categoryNumber) => {
    navigate(`/category/${categoryNumber}`);
  };

  return (
    <Container className="main mt-0">
      {/* <h1>Categories Component</h1> */}
      {categories.length === 0 ? (
        <p>No categories available.</p>
      ) : (
        <Row className="mt-5">
          {categories.map((category) => (
            <Col key={category._id} xs={6} md={4} lg={3} className="mb-4">
              <Card onClick={() => handleCategoryClick(category.category_number)} style={{ cursor: 'pointer', textAlign: 'center' }} className="rounded-0 border-0">
                <Card.Img variant="top"
                  src={category.imgsrc ? `${BASE_URL}${category.imgsrc}` : "https://via.placeholder.com/150x265"} 
                  alt="Category image" 
                  style={{ borderRadius: '1rem' }} // Apply border-radius directly
                />
                <Card.Body className="d-flex flex-column justify-content-center">
                  <Card.Title>
                    {language === 'EN' ? category.EnglishName : category.ArabicName}
                    <br />
                    {/* <small>Category Number: {category.category_number}</small> */}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {/* Spacer to prevent footer from covering content */}
      <div style={{ height: '50px' }}></div>
    </Container>
  );
}

export default Categories;
