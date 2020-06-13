/*ACA LOS ICONOS*/
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faLinkedinIn} from'@fortawesome/free-brands-svg-icons';
import {faTwitter} from'@fortawesome/free-brands-svg-icons';

import {Row} from 'reactstrap';

import styled from '@emotion/styled';

const SocialIcon=styled.div`
color:#EACAF9;
transition: .5s !important;
transform:scale(1);
margin-right:1rem;

&:hover{
    transform: translate(0, -5px);
    transition:1s;
    cursor:pointer;
}
`

const SocialLinks = () => {
    return ( 
        <Row>
        <div className="col-lg-8 col-md-10 mx-auto">
          <ul className="list-inline text-center">
            <li className="list-inline-item">
              <a href="#">
              <SocialIcon>
                <FontAwesomeIcon icon={faInstagram} size="2x" color="#EACAF9"/>
                </SocialIcon>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
              <SocialIcon>
                <FontAwesomeIcon icon={faLinkedinIn} size="2x" color="#EACAF9"/>
                </SocialIcon>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
              <SocialIcon>
                <FontAwesomeIcon icon={faTwitter} size="2x" color="#EACAF9"/>
                </SocialIcon>
              </a>
            </li>
          </ul>
          <p className="copyright text-muted" style={{marginTop:"12px"}}>Esteban Indiveri 2020 &copy;</p>
        </div>
      </Row>
    );
}
 
export default SocialLinks;