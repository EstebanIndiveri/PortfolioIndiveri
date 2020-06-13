import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import BasePage from '../components/BasePage';
import{Row,Col}from'reactstrap';
import styled from '@emotion/styled'

const Span = styled.span`
font-weight:bold;
text-align:center;
color:#EACAF9;
font-size:2rem;
`;
const Div=styled.div`
text-align:center;
align-content:center;
margin-top:10px;
`
const P=styled.p`
text-align:justify;
`

class AboutUs extends Component {
    render() {
        return (
            <BaseLayout title="Esteban Indiveri - About Me" {...this.props.auth}>
                <BasePage className='about-page'>
                <Row className="mt-5">
                    <Col md="6">
                        <div className="left-side">
                        <h1 className="title fadein">Hello, Welcome</h1>
                        <h4 className="subtitle fadein">To About Page</h4>
                        <p className="subsubTitle fadein">Feel free to read short description about me.</p>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="fadein">
                        <P>My name is <b>Esteban Indiveri</b> and I am an experienced software engineer and freelance developer. </P>
                        <P>
                        I have a experience working on a wide range of technologies C#, Kotlin, Flutter, Javascript creating modern mobile and web applications using Frameworks like React and Angular.
                        </P>
                        <P>
                        Throughout my career, I have acquired advanced technical knowledge. I invite you to contact with me and work together.
                        <Div><Span>Make your projects real!</Span></Div>
                        </P>
                        </div>
                    </Col>
                    </Row>

                </BasePage>
            </BaseLayout>
        )
    }
}
export default AboutUs;