import React, { Component } from 'react'
import BaseLayout from '../components/layout/BaseLayout';
import BasePage from '../components/BasePage';
import { Row, Col } from 'reactstrap';


class Curriculum extends Component {
    render() {
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage title="Read my CV" className="cv-page">
                    <Row>
                        <Col md={{size:8, offset:2}}>
                            <div
                            className="cv-title"
                            >
                            <a 
                            download="CvIndiveri.pdf" 
                            className="btn btn-success" 
                            href="/static/CvIndiveri.pdf"
                            >Download</a>
                            </div>
                            <iframe style={{width:'100%',height:'67rem',boxShadow:'2px 2px 5px 2px #e1e1e1',borderRadius:'16px'}} src="/static/CvIndiveri.pdf">

                            </iframe>
                        </Col>
                    </Row>
                </BasePage>

            </BaseLayout>
        )
    }
}
export default Curriculum;