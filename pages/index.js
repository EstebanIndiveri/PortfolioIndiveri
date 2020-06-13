import React, { Component, Fragment } from 'react'
import BaseLayout from '../components/layout/BaseLayout';
import { Container,Row,Col } from 'reactstrap';
import Typed from 'react-typed';
import styled from '@emotion/styled';


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faLinkedinIn} from'@fortawesome/free-brands-svg-icons';
import {faTwitter} from'@fortawesome/free-brands-svg-icons';


const ContainerC=styled.div`
  background-image:url("/static/img/0003.jpg");
  background-size:cover;
  background-repeat:no-repeat;
  animation: fadein 2s;
  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  margin:0;
  padding:0;

`;


class Index extends Component {
  constructor(props){
    super(props);
    this.roles=['Developer','Full Stack Engineer','UX/UI Designer']
  }
    render() {
      const {isAuthenticated,user}=this.props.auth;
      
        return (
          <ContainerC>
            <BaseLayout className="cover" {...this.props.auth} headerType='index' title="Esteban Indiveri - Portfolio">
              <div className="main-section">
                <div className="background-image">

              </div>

    <Container>
      <Row>
        <Col md="12" className="hero-welcome-wrapper">
          <div className="hero-welcome-text">
            <h1>
              {isAuthenticated &&<span><b>{user.name} </b></span>}
              Welcome to the portfolio website of Esteban Indiveri.<br/>
              Get informed, collaborate and discover projects I was working on this year
            </h1>
          </div>

          <div style={{textAlign:"center"}}>
          <Typed
            loop
            typeSpeed={60}
            backSpeed={60}
            strings={this.roles}
            backDelay={1000}
            loopCount={0}
            showCursor
            className="self-typed"
            cursorChar="|"
          />
          </div>

          <div className="hero-welcome-bio">
            <h2>
              Let's take a look on my work.
            </h2>
          </div>
          <div className="mt-5">
                          <a href="https://instagram.com/estebanindiveri" target="_blank">
                          <FontAwesomeIcon className="socialLink" icon={faInstagram} size="xs" color="#EACAF9" width="30" />
                          </a>

                          <a href="https://twitter.com/esteban_tefa" target="_blank">
                            <FontAwesomeIcon className="socialLink" icon={faTwitter} size="xs" color="#EACAF9" width="30" style={{margin:'1rem'}} />
                          </a>
                          <a href="https://www.linkedin.com/in/esteban-indiveri/" target="_blank">
                          <FontAwesomeIcon className="socialLink" icon={faLinkedinIn} size="xs" color="#EACAF9" width="30"/>
                          </a>
                      </div>
        </Col>
      </Row>
    </Container>
  </div>
</BaseLayout>
</ContainerC>

        )
    }
}
export default Index;