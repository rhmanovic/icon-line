import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { BASE_URL } from "../config";
import { sleeveLengthOptions, cuffSizeOptions, abayaLengthOptions, shoulderSizeOptions, chestSizeOptions } from "../utils/options";
// import "../style/App.css";

const ProductPage = ({ language, onAddToCart }) => {
  const { productNumber } = useParams();
  const [product, setProduct] = useState(null);
  const [customerNote, setCustomerNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [sleeveLength, setSleeveLength] = useState("");
  const [cuffSize, setCuffSize] = useState("");
  const [abayaType, setAbayaType] = useState("");
  const [abayaLength, setAbayaLength] = useState("");
  const [shoulderSize, setShoulderSize] = useState("");
  const [chestSize, setChestSize] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/products/number/${productNumber}`)
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [productNumber]);

  const handleAddToCart = () => {
    if (product && quantity) {
      const note = `
        ملاحظة العميل: ${customerNote}
        طول الكم: ${sleeveLength}
        قياس الحفرة: ${cuffSize}
        نوع العباية: ${abayaType}
        طول العباية: ${abayaLength}
        حجم الكتف: ${shoulderSize}
        حجم الصدر: ${chestSize}
      `;

      const cartItem = {
        productId: product._id,
        productNumber: product.product_number,
        productName: language === 'EN' ? product.product_name_en : product.product_name_ar,
        product_name_en: product.product_name_en,
        product_name_ar: product.product_name_ar,
        warranty: product.warranty,
        variantId: null,
        variantName: null,
        brandName: product.brand,
        productImage: product.product_image,
        price: parseFloat(product.sale_price),
        quantity: parseInt(quantity, 10),
        customerNote: note.trim(),
        sleeveLength,
        cuffSize,
        abayaType,
        abayaLength,
        shoulderSize,
        chestSize,
      };
      onAddToCart(cartItem);
    } else {
      alert("Please enter a valid quantity.");
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="main mt-5">
      <Row>
        <Col xs={12} md={6}>
          <Card.Img
            src={product.product_image ? `${BASE_URL}${product.product_image}` : "https://via.placeholder.com/150x265"}
            alt={language === 'EN' ? product.product_name_en : product.product_name_ar}
            className="rounded"
            style={{
              width: '100%',
              height: 'auto',
              aspectRatio: '9 / 14', // Set aspect ratio to 9:14
              objectFit: 'cover'
            }}
          />
          <h1 className="mt-3">{language === 'EN' ? product.product_name_en : product.product_name_ar}</h1>
          <h2>{product.sale_price} K.D</h2>

          <Form.Group className="mt-3">
            <Form.Label>{language === 'EN' ? "Customer Note" : "ملاحظة العميل"}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={language === 'EN' ? "Enter your note" : "أدخل ملاحظتك"}
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              style={{ minHeight: '100px' }}
            />
          </Form.Group>

          {product.options && (
            <>
              <Row className="mt-3">
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>{language === 'EN' ? "Sizes (inch)" : "المقاسات (انش)"}</Form.Label>
                    <Form.Control
                      as="select"
                      value={abayaLength}
                      onChange={(e) => setAbayaLength(e.target.value)}
                    >
                      {abayaLengthOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Control
                      as="select"
                      value={shoulderSize}
                      onChange={(e) => setShoulderSize(e.target.value)}
                    >
                      {shoulderSizeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Control
                      as="select"
                      value={chestSize}
                      onChange={(e) => setChestSize(e.target.value)}
                    >
                      {chestSizeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col xs={6} style={{ textAlign: 'right' }} dir="rtl">
                  <Form.Group>
                    <Form.Label>{language === 'EN' ? "Sizes (inch)" : "المقاسات (انش)"}</Form.Label>
                    <br />
                    <Form.Check
                      type="radio"
                      label={language === 'EN' ? "Without Tabby" : "بدون طباقي"}
                      name="abayaType"
                      value="withoutTabby"
                      checked={abayaType === "withoutTabby"}
                      onChange={(e) => setAbayaType(e.target.value)}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label={language === 'EN' ? "Full Tabby" : "كامل طباقي"}
                      name="abayaType"
                      value="fullTabby"
                      checked={abayaType === "fullTabby"}
                      onChange={(e) => setAbayaType(e.target.value)}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label={language === 'EN' ? "Closed" : "مسكره"}
                      name="abayaType"
                      value="closed"
                      checked={abayaType === "closed"}
                      onChange={(e) => setAbayaType(e.target.value)}
                      inline
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col>
                  <Form.Group>
                    <Form.Label>{language === 'EN' ? "Sleeve Length (Optional)" : "طول الكم (إختياري)"}</Form.Label>
                    <Form.Control
                      as="select"
                      value={sleeveLength}
                      onChange={(e) => setSleeveLength(e.target.value)}
                    >
                      {sleeveLengthOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>{language === 'EN' ? "Cuff Size (Optional)" : "قياس الحفرة (إختياري)"}</Form.Label>
                    <Form.Control
                      as="select"
                      value={cuffSize}
                      onChange={(e) => setCuffSize(e.target.value)}
                    >
                      {cuffSizeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}

          <Form.Group className="mt-3">
            <Form.Label>{language === 'EN' ? "Quantity" : "الكمية"}</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              step="1"
            />
          </Form.Group>
          <Button className="mt-3" onClick={handleAddToCart}>
            {language === 'EN' ? "Add to Cart" : "أضف إلى السلة"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
