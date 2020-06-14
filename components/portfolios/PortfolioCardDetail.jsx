import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {css} from '@emotion/core';
import styled from '@emotion/styled';

import moment from 'moment';


const Boton =styled(Button)`
background-color:#828282 !important;
border:none !important;
transition:300ms;

&:hover{
    opacity:0.8;
    transition:300ms;
}

`
const ModalHe=styled(ModalHeader)`
    color:#EACAF9 !important;
text-transform: uppercase !important;
`
const Imagen =styled.img`
max-height:400px;
max-width:100%;
`;

class PortfolioCardDetail extends React.Component{

    render(){
        const{isOpen,toggle,portfolio}=this.props;
        return (
            <div>
            <Modal isOpen={isOpen} toggle={toggle} >
                <ModalHe toggle={toggle}><b>{portfolio.title}</b></ModalHe>
                <ModalBody>
                <p><b>Description: </b>{portfolio.description}</p>
                <p><b>Company: </b>{portfolio.company}</p>
                <p><b>position: </b>{portfolio.position}</p>
                <p><b>location: </b>{portfolio.location}</p>
                <p><b>Start Date: </b>{moment(portfolio.startDate).format('MMMM YYYY')}</p>
                <p><b>End Date: </b>{portfolio.endDate?moment(portfolio.endDate).format('MMMM YYYY'):'Still Workin'}</p>
                {portfolio.url?
               (    <p><b>Web Page: </b><a href={portfolio.url} target="_blank">Visit Page</a></p>)
               :(null)
                }
                {
                    portfolio.imageUrl?(<Imagen src={portfolio.imageUrl}/>):(null)
                }
                
                </ModalBody>
                <ModalFooter>
                <Boton  
                onClick={toggle}
                >Cancel</Boton>
                </ModalFooter>
            </Modal>
            </div>
        );
    }
}

export default PortfolioCardDetail;