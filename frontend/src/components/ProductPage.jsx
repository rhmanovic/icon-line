import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { BASE_URL } from "../config";
import translations from "../utils/translations";
import { sleeveLengthOptions, cuffSizeOptions, abayaLengthOptions, shoulderSizeOptions, chestSizeOptions } from "../utils/options";

const ProductPage = ({ language = 'EN', onAddToCart }) => {
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

  const t = language === 'EN' ? translations.en.productPage : translations.ar.productPage || translations.en.productPage;
  const currency = language === 'EN' ? translations.en.currency : translations.ar.currency;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/products/number/${productNumber}`)
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [productNumber]);

  const translatedOptions = (options, firstOptionTranslation) => [
    { value: '', label: firstOptionTranslation },
    ...options
  ];

  if (!product) {
    return <p>{t.loading}...</p>;
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
              aspectRatio: '9 / 14',
              objectFit: 'cover'
            }}
          />
          <h1 className="mt-3">{language === 'EN' ? product.product_name_en : product.product_name_ar}</h1>
          <h2>{product.sale_price} {currency}</h2>
          <div
            className="my-4"
            dangerouslySetInnerHTML={{
              __html: language === 'EN' ? product.description_en : product.description_ar,
            }}
          ></div>

          {product.options && (
            <>
              <Row className="mt-3">
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>{t.sizesInch}</Form.Label>
                    <Form.Control
                      as="select"
                      value={abayaLength}
                      onChange={(e) => setAbayaLength(e.target.value)}
                    >
                      {translatedOptions(abayaLengthOptions, t.selectAbayaLength).map(option => (
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
                      {translatedOptions(shoulderSizeOptions, t.selectShoulderSize).map(option => (
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
                      {translatedOptions(chestSizeOptions, t.selectChestSize).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>{t.sizesInch}</Form.Label>
                    <br />
                    <div className="custom-radio">
                      <input
                        type="radio"
                        id="withoutTabby"
                        name="abayaType"
                        value="withoutTabby"
                        checked={abayaType === "withoutTabby"}
                      />
                      <label className="mx-2" htmlFor="withoutTabby">{t.withoutTabby}</label>
                    </div>
                    <div className="custom-radio">
                      <input
                        type="radio"
                        id="fullTabby"
                        name="abayaType"
                        value="fullTabby"
                        checked={abayaType === "fullTabby"}
                      />
                      <label className="mx-2" htmlFor="fullTabby">{t.fullTabby}</label>
                    </div>
                    <div className="custom-radio">
                      <input
                        type="radio"
                        id="closed"
                        name="abayaType"
                        value="closed"
                        checked={abayaType === "closed"}
                      />
                      <label className="mx-2" htmlFor="closed">{t.closed}</label>
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col>
                  <Form.Group>
                    <Form.Label>{t.sleeveLengthOptional}</Form.Label>
                    <Form.Control
                      as="select"
                      value={sleeveLength}
                      onChange={(e) => setSleeveLength(e.target.value)}
                    >
                      {translatedOptions(sleeveLengthOptions, t.selectSleeveLength).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>{t.cuffSizeOptional}</Form.Label>
                    <Form.Control
                      as="select"
                      value={cuffSize}
                      onChange={(e) => setCuffSize(e.target.value)}
                    >
                      {translatedOptions(cuffSizeOptions, t.selectCuffSize).map(option => (
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
            <Form.Label>{t.customerNote}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={t.enterCustomerNote}
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              style={{ minHeight: '100px' }}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>{t.quantity}</Form.Label>
            <div className="item-quantity d-flex align-items-center mt-2">
              <button className="btn btn-outline-secondary p-1 px-2 mx-1" onClick={() => setQuantity(quantity - 1)}>-</button>
              <input 
                type="number" 
                className="form-control quantity-input mx-3" 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ width: '100px', maxWidth: '100px', textAlign: 'center' }}
              />
              <button className="btn btn-outline-secondary p-1 px-2 mx-1" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </Form.Group>
          <Button className="mt-3" onClick={() => alert('Add to Cart')}>
            {t.addToCart}
          </Button>
        </Col>
      </Row>

      <div style={{ height: '100px' }}></div>
    </Container>
  );
};

export default ProductPage;
