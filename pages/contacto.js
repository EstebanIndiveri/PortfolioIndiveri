import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import BaseLayout from '../components/layout/BaseLayout';
import BasePage from '../components/BasePage';
import axios from 'axios';
import styled from '@emotion/styled';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons'


const Ul =styled.ul`
list-style:none;
margin-top:20px;

li{
margin-bottom:10px;
}
`


export default class ContactForm extends Component {

    state={
        name:'',
        company:'',
        email:'',
        phone:'',
        message:'',
        sent:false
    }

    //handle inputs
    handleName=(e)=>{
        this.setState({
            name:e.target.value
        })
    }

    handleCompany=(e)=>{
        this.setState({
            company:e.target.value
        })
    }

    handleEmail=(e)=>{
        this.setState({
            email:e.target.value
        })
    }
    handlePhone=(e)=>{
        this.setState({
            phone:e.target.value
        })
    }

    handleMessage=(e)=>{
        this.setState({
            message:e.target.value
        })
    }
    //end of handle input:

    formSubmit=(e)=>{
        e.preventDefault();
        let data={
            name:this.state.name,
            company:this.state.company,
            email:this.state.email,
            phone:this.state.phone,
            message:this.state.message
        }
        axios.post('/api/v1/send',data).then(res=>{
            this.setState({
                sent:true
            },this.resetForm())
        })
        .catch(error=>console.log(error))
    }

    //form reset initial:
    resetForm=()=>{
        this.setState({
            name:'',
            company:'',
            email:'',
            phone:'',
            message:'',
            sent:true

        })
        setTimeout(() => {
            this.setState({
                sent:false
            })
        }, 5000);
    }




    render() {
        return (
            <BaseLayout {...this.props.auth}>
             <BasePage className='portfolio-create-page' title="Contact with me"> 
             <div className={this.state.sent?'msg msgAppear':'msg'}>Message has been send</div>
                <Row>
                    <Col md="6">
                    <Form onSubmit={this.formSubmit}>
                        <FormGroup>
                            <Label htmlFor="name">Name</Label>
                            <Input 
                            type="text" 
                            name="name" 
                            className="name" 
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleName}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="company">Company</Label>
                            <Input 
                            type="text" 
                            name="company" 
                            className="company" 
                            placeholder="Company"
                            value={this.state.company}
                            onChange={this.handleCompany}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input 
                            type="email" 
                            name="email" 
                            className="email" 
                            placeholder="example@email.com"
                            value={this.state.email}
                            onChange={this.handleEmail}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="phone">Phone</Label>
                            <Input 
                            type="number" 
                            name="phone" 
                            className="phone" 
                            placeholder="+543512694707"
                            value={this.state.phone}
                            onChange={this.handlePhone}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="message">Message</Label>
                            <Input 
                            type="textarea" 
                            name="message" 
                            className="message" 
                            row="5" 
                            placeholder="Your Message"
                            value={this.state.message}
                            onChange={this.handleMessage}
                            />
                        </FormGroup>

         
                    <Button size="lg" block type="submit" >Send</Button>
                  
                    </Form>
                    </Col>
                    <Col md="6">
                        <div className="text-center">
                            <h2 className="text-center">Other ways to connect</h2>
                            <Ul>
                             <li><a href="mailto:esteban.indiveri@gmail.com" >
                          <FontAwesomeIcon className="socialLink" icon={faEnvelope} size="lg" color="#EACAF9" width="30" />
                          </a> Email: esteban.indiveri@gmail.com</li>
                          <li><a href="https://api.whatsapp.com/send?phone=543512694707&text=%20" >
                          <FontAwesomeIcon className="socialLink" icon={faWhatsapp} size="lg" color="#EACAF9" width="30" />
                          </a>  Phone: 3512694707</li>
                            </Ul>
                        </div>
                    </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}
