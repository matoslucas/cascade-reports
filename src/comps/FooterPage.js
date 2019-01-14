import React from "react";
import {
  Col,
  Container,
  Row,
  Media,
  Footer,
  CardBody,
  Fa,
} from "mdbreact";

class FooterPage extends React.Component {
  render() {
    return (
      <Footer className="font-small" style={{ backgroundColor: '#3f3f3f'}}>
        <Container fluid className="text-center text-md-left">
          <Row>
            <Col md="6">
              <CardBody className="contact text-center h-100 white-text">
                <Media left >
                  <Media object src={require('../assets/img/logo.png')} alt="Cascade logo" style={{ width: 200 }} />
                </Media>
                <hr className="hr-light my-4" />
                <p>
                  We are building the legacy buildings of tomorrow,
                  the designs that future generations will look back on for inspiration.
                  We believe the only way to give them something worth looking at is by working together:
                  you have the vision, and we have the know-how.
              </p>
              </CardBody>

            </Col>
            <Col md="6">

              <CardBody className="contact text-center h-100 white-text">
                <h3 className="my-4 pb-2">Contact Us</h3>
                <ul className="text-lg-left list-unstyled ml-4">
                  <li>
                    <Fa icon="map-marker-alt" className="pr-2" />
                    <a href="https://www.google.com/maps/dir/?api=1&destination=352+Gold+Tip+Dr+OREM+UT+84058">
                      352 Gold Tip Drive, Orem, UT 84058
                  </a>

                  </li>
                  <li>
                    <Fa icon="phone" className="pr-2" />
                    <a href="tel:801-980-3393">Phone: (801) 980-3393</a>

                  </li>

                  <li>
                    <Fa icon="phone" className="pr-2" />
                    <a href="tel:801-881-8100">Fax: (801) 881-8100</a>

                  </li>


                  <li>
                    <Fa icon="envelope" className="pr-2" />
                    <a href="mailto:info@cascade.build?Subject=Contact"> Email: info@cascade.build</a>
                  </li>
                </ul>
                <hr className="hr-light my-4" />
                <ul className="list-inline text-center list-unstyled">
                  <li className="list-inline-item">
                    <a href="#!" className="p-2 fa-lg w-ic">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#!" className="p-2 fa-lg w-ic">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#!" className="p-2 fa-lg w-ic">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </CardBody>
              {/*
                <h5 center className="title d-flex justify-content-center">Contact Us</h5>
                              <ul>
                                <li className="list-unstyled">
                                  <a href="https://www.google.com/maps/dir/?api=1&destination=352+Gold+Tip+Dr+OREM+UT+84058">
                                    352 Gold Tip Drive, Orem, UT 84058
                                  </a>
                                </li>
                                <li className="list-unstyled">
                                  <a href="tel:801-980-3393">Phone:  (801) 980-3393</a>
                                </li>
                                <li className="list-unstyled">
                                  <a href="tel:801-881-8100">Fax: (801) 881-8100</a>
                                </li>
                                <li className="list-unstyled">
                                  <a href="mailto:info@cascade.build?Subject=Contact"> Email: info@cascade.build</a>
                                </li>
                              </ul>
                */}

            </Col>
          </Row>
        </Container>
        <div className="footer-copyright text-center py-3">
          <Container fluid>
            &copy;  Copyright  {new Date().getFullYear()} -
      <a href="//cascade.build"> Cascade Stucco LLC. </a>
          </Container>
        </div>
      </Footer>
    );
  }
}

export default FooterPage;