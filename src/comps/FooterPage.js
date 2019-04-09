import React from "react";
import {
  // Col,
  Container,
  // Row,
  // Media,
  Footer,
  // CardBody,
  // Fa,
} from "mdbreact";

class FooterPage extends React.Component {
  render() {
    return (
      <Footer className="font-small" style={{ backgroundColor: '#3f3f3f'}}>
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