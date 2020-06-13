import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import {updatePortfolio,getPortfolioById}from '../actions';
import {Router} from '../routes';


class PortfolioEdit extends Component {

    static async getInitialProps({query}){
        let portfolio={};

        try {
            portfolio=await getPortfolioById(query.id)

        } catch (error) {
            console.log(error);
        }
        return {portfolio}
    }

    constructor(props){
        super();
        this.updatePortfolio=this.updatePortfolio.bind(this);
        this.state={
            error:undefined
        }
    }
    
updatePortfolio(portfolioData,{setSubmitting}){
    setSubmitting(true);
    updatePortfolio(portfolioData)
      .then((portfolio) => {
        setSubmitting(false);
        this.setState({error: undefined});
        Router.pushRoute('/portfolios');
      })
      .catch((err) => {
        const error = err.message || 'Server Error!';
        setSubmitting(false);
        this.setState({error});
      })
  }


    render() {
        const{error}=this.state;
        const{portfolio}=this.props;
        return (
            <BaseLayout >
                <BasePage className='portfolio-create-page' title="Update Portfolio">
                    <Row>
                        <Col md="6">
                            <PortfolioCreateForm 
                            initialValues={portfolio} 
                            error={error} 
                            onSubmit={this.updatePortfolio}
                            />
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}
export default withAuth('siteOwner')(PortfolioEdit);