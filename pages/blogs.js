import React, { Component } from 'react'
import BaseLayout from '../components/layout/BaseLayout';
import BasePage from '../components/BasePage';
import {Col,Row,Container} from 'reactstrap';
import {Link} from '../routes';
import moment from 'moment';
import styled from '@emotion/styled';
import {shortenText} from '../helpers/utils';
/*ACA LOS ICONOS*/
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faLinkedinIn} from'@fortawesome/free-brands-svg-icons';
import {faTwitter} from'@fortawesome/free-brands-svg-icons';

import SocialLinks from '../components/SocialLinks';
import { getBlogs } from '../actions';


const Div=styled.div`
background-image:url("/static/img/bk-blog.jpg") !important;
animation: fadein 2s;
  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`
const A = styled.a`
    margin-bottom: 20px;
    background-color:#EACAF9 !important;
    border:none !important;
    color:#FFFFFF;
    opacity: 1;
    transition: opacity 300ms;

    &:hover{
        opacity:0.8 !important;
        transition:opacity 300ms !important;
    }
`



class Blog extends Component {

    static async getInitialProps({req}){
      let blogs=[];
      try {
        blogs=await getBlogs(req);
      } catch (error) {
        console.log(error);
      }
      return{blogs}
    }

    renderBlogs=(blogs)=>(
      blogs.map((blog,index)=>(

        <div key={index} className="post-preview">
        <Link route={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="post-title">
              {blog.title}
            </h2>
            <h3 className="post-subtitle">
              {shortenText(blog.subTitle)}
            </h3>
          </a>
        </Link>
        <p className="post-meta">Posted by
          <a href="#"> {blog.author} </a>
          {moment(blog.createdAt).format('LL')}</p>
      </div>

      ))
    )

    render() {
      const{blogs}=this.props;
        return (
            <BaseLayout title="Esteban Indiveri - Newest to Read" {...this.props.auth} headerType={'landing'} className="blog-listing-page">
            <Div className="masthead">
              <div className="overlay"></div>
              <Container>
                <div className="row">
                  <div className="col-lg-8 col-md-10 mx-auto">
                    <div className="site-heading">
                      <h1>Fresh Blogs</h1>
                      <span className="subheading">Developer's diary...</span>
                    </div>
                  </div>
                </div>
              </Container>
            </Div>
            <BasePage className="blog-body">
              <Row>
                <Col md="10" lg="8" className="mx-auto">
                  {
                    this.renderBlogs(blogs)
                  }
                  <div className="clearfix">
                    <A className="btn btn-primary float-right" href="#">Older Posts &rarr;</A>
                  </div>
                </Col>
              </Row>
          
              <footer>
                <Container>
                <Row>
                    <Col md="12" className="text-center">
                      <div className="mt-5">
                          <a href="https://instagram.com/estebanindiveri" target="_blank">
                          <FontAwesomeIcon className="socialLink" icon={faInstagram} size="xs" color="#EACAF9" width="30" />
                          </a>
                          <a href="https://instagram.com/esteban_tefa" target="_blank">
                            <FontAwesomeIcon className="socialLink" icon={faTwitter} size="xs" color="#EACAF9" width="30" style={{margin:'1rem'}} />
                          </a>
                          <a href="https://www.linkedin.com/in/esteban-indiveri/" target="_blank">
                          <FontAwesomeIcon className="socialLink" icon={faLinkedinIn} size="xs" color="#EACAF9" width="30"/>
                          </a>
                      </div>
                      <p className="copyright text-muted" style={{marginTop:"12px"}}>Esteban Indiveri 2020 &copy;</p>
                    </Col>
                  </Row>
                </Container>
              </footer>
            </BasePage>
          </BaseLayout>
          
        )
    }
}
export default Blog;