import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import {createPortfolio}from '../actions';
import {Router} from '../routes';
import moment from 'moment';

const INITIAL_VALUES={
    title:'',
    company:'',
    location:'',
    position:'',
    description:'',
    startDate:moment(),
    endDate:moment(),
    imageUrl:''
    }   



class PortfolioNew extends Component {
    constructor(props){
        super();
        this.savePortfolio=this.savePortfolio.bind(this);
        this.state={
            error:undefined
        }
    }
    
savePortfolio(portfolioData,{setSubmitting}){
    setSubmitting(true);
    createPortfolio(portfolioData)
        .then(portfolio=>{
        setSubmitting(false);
        this.setState({error:undefined})
        Router.pushRoute('/portfolios');
        })
        .catch(err=>{
            const error=err.message || 'Server Error!';
            setSubmitting(false);
            this.setState({error});
        });


    // alert(JSON.stringify(portfolioData, null, 2));
    // const fd=new FormData();
    // fd.append('image',this.state.selectedFile, this.state.selectedFile.name)
    // axios.post('API A LA QUE PUSHEAR',fd,{
    //     onUploadProgress:progressEvent=>{
    //         console.log('upload PRogress:'+Math.round(progressEvent.loaded/progressEvent.total*100)+'%')
    //     }
    // })
    // .then(res=>{
    //     console.log(res);
    // });
        
}


    render() {
        const{error}=this.state;
        return (
            <BaseLayout >
                <BasePage className='portfolio-create-page' title="Create new Portfolio">
                    <Row>
                        <Col md="6">
                            <PortfolioCreateForm  
                            initialValues={INITIAL_VALUES} 
                            error={error} 
                            onSubmit={this.savePortfolio}
                            />
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}
export default withAuth('siteOwner')(PortfolioNew);