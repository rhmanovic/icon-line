import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { Card, Container, Row, Col } from "react-bootstrap";
// import "../style/App.css";
import { BASE_URL } from "../config";

function CategoryProducts({ language, onAddToCart, cart }) {
  const { categoryNumber } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    console.log(`Fetching products for category number: ${categoryNumber}`);
    axios
      .get(`${BASE_URL}/api/categories/${categoryNumber}/products`)
      .then((response) => {
        console.log("Fetched products:", response.data);
        const { products } = response.data;
        setProducts(products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [categoryNumber]);

  const handleProductClick = (productNumber) => {
    navigate(`/product/${productNumber}`);
  };

  return (
    <Container className="main mt-0">
      {products.length === 0 ? (
        <p>No products available for this category.</p>
      ) : (
        <Row className="mt-5">
          {products.map((product) => (
            <Col key={product._id} xs={6} md={4} lg={3} className="mb-4">
              <Card 
                onClick={() => handleProductClick(product.product_number)} 
                style={{ cursor: 'pointer', textAlign: 'center' }} 
                className="rounded-0 border-0"
              >
                <Card.Img 
                  variant="top"
                  src={product.product_image ? `${BASE_URL}${product.product_image}` : "https://via.placeholder.com/150x265"} 
                  alt={language === 'EN' ? product.product_name_en : product.product_name_ar} 
                  className="rounded"
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    aspectRatio: '9/16', 
                    objectFit: 'cover' 
                  }} 
                />
                <Card.Body className="d-flex flex-column justify-content-center">
                  <span dir="ltr">
                    {product.sale_price} K.D
                  </span>
                  <Card.Title>
                    {language === 'EN' ? product.product_name_en : product.product_name_ar}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default CategoryProducts;
