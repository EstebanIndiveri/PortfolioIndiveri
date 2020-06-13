import React, { Component, Fragment } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import Link from 'next/link';
import {getPortfolios, deletePortfolio}from '../actions/';
import BasePage from '../components/BasePage';
import { Row,Col, Button } from 'reactstrap';
import {css}from '@emotion/core';
import PortfolioCard from '../components/portfolios/PortfolioCard';

import {Router}from '../routes';

class Porfolios extends Component {
    static async getInitialProps(){
        let portfolios=[];
        try {
            portfolios=await getPortfolios();
        } catch (error) {
            console.error(error)
        }
        return {portfolios}
    }
    
    navigateToEdit(portfolioId,e){
        e.stopPropagation();
        Router.pushRoute(`/portfolio/${portfolioId}/edit`)
    }

    displayDeleteWarning(portfolioId,e){
        e.stopPropagation();
       const isConfirm= confirm('Are you sure you want to delete this portfolio?')

       if(isConfirm){
        this.deletePortfolio(portfolioId);
       }
    }

    deletePortfolio(portfolioId){
        deletePortfolio(portfolioId)
        .then(()=>{
            Router.pushRoute('/portfolios');
        })
        .catch(err=>console.error(err));
    }

    renderPortfolios(portfolios) {
        const{isAuthenticated,isSiteOwner}=this.props.auth
        return portfolios.map((portfolio,index)=>{
            return(
                <Col className="cardin" md="4" key={index}>
                    <PortfolioCard portfolio={portfolio}>
                    {isAuthenticated && isSiteOwner &&
                        <Fragment>
                            <Button className="edit-btn" onClick={(e)=>this.navigateToEdit(portfolio._id,e)} >Edit</Button>{' '}
                            <Button onClick={(e)=>this.displayDeleteWarning(portfolio._id,e)} className="delete-btn">Delete</Button>
                        </Fragment>
                    }
                    </PortfolioCard>
                </Col>

            )
        })
    }
    render(){
        const{portfolios}=this.props;
        const{isAuthenticated,isSiteOwner}=this.props.auth
        return (
            <BaseLayout title="Esteban Indiveri - My Experience" {...this.props.auth}>
                <BasePage className="portfolio-page" title="Portfolio">
                    {isAuthenticated && isSiteOwner &&
                    <Button 
                    onClick={()=>Router.pushRoute('/portfolios/new')} 
                     className="create-port-btn"
                    >Create Portfolio</Button>
                    }
                    <Row>
                     {this.renderPortfolios(portfolios)}
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}
export default Porfolios;