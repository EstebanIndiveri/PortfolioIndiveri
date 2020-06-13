import React, { Component } from 'react'
import { Card,CardHeader,CardBody,CardText,CardTitle, Button } from 'reactstrap';
import PorfolioCardDetail from './PortfolioCardDetail';
import styled from '@emotion/styled'

const Imagen =styled.img`
max-height:200px;
max-width:100%;
align-content:center;
align-items:center;
margin:auto;
`;


class PortfolioCard extends Component {
    constructor(props){
        super(props);
        this.state={
            isOpen:false
        }
        this.handleToggle=this.handleToggle.bind(this);
    }


    handleToggle(){
        this.setState({
            isOpen:!this.state.isOpen
        })
    }

    render() {
        const{portfolio,children}=this.props;
        const{isOpen}=this.state;
        return (
            <div>
                <div>
                <span onClick={this.handleToggle} className="imge">
                <PorfolioCardDetail toggle={this.handleToggle} portfolio={portfolio} isOpen={isOpen}/>
                <Card className="portfolio-card" >
                    <CardHeader className="portfolio-card-header">{portfolio.position}</CardHeader>
                    <CardBody>
                       
                    <p className="portfolio-card-city"> {portfolio.location} </p>
                    <CardTitle className="portfolio-card-title">{portfolio.title}</CardTitle>
                    <CardText className="portfolio-card-text">{portfolio.description}</CardText>
                    <div className="readMore"> 
                        {children}
                    </div>
                    </CardBody>
                
                </Card>
                </span>
                </div>
            </div>
        )
    }
}

export default PortfolioCard
