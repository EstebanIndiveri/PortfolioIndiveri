import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import {Container, Row, Col,Button  } from 'reactstrap';
import{getUserBlogs,updateBlog, deleteBlog}from'../actions'
import SocialLinks from '../components/SocialLinks';
import {Link,Router} from '../routes';
import PortButtonDropdown from '../components/ButtonDropdown';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faTwitter} from'@fortawesome/free-brands-svg-icons';
import {faLinkedinIn} from'@fortawesome/free-brands-svg-icons';


import styled from '@emotion/styled';


const Div=styled.div`
background-image:url("/static/img/bk-blog.jpg") !important;
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


class UserBlogs extends Component {

    static async getInitialProps({req}) {
        let blogs = [];
    
        try {
          blogs = await getUserBlogs(req);
        } catch(err) {
          console.error(err);
        }
    
        return {blogs};
      }

      separateBlogs(blogs) {
        const published = [];
        const drafts = [];
    
        blogs.forEach((blog) => {
          blog.status === 'draft' ? drafts.push(blog) : published.push(blog);
        });
    
        return {published, drafts};
      }

      createStatus(status) {
        return status === 'draft' ? {view: 'Publish Story', value: 'published'}
                                  : {view: 'Make a Draft', value: 'draft'};
      }

      /**/
      changeBlogStatus(status, blogId) {
        updateBlog({status}, blogId)
          .then(() => {
            Router.pushRoute('/userBlog');
          })
          .catch(err => {
          console.error(err.message);
        })
      }
    
      deleteBlogWarning(blogId) {
        const res = confirm('Are you sure you want to delete this blog post?');
    
        if (res) {
          this.deleteBlog(blogId);
        }
      }
    
      deleteBlog(blogId) {
        deleteBlog(blogId)
          .then(status => {
            Router.pushRoute('/userBlog');
          })
          .catch(err => console.error(err.message)
        )
      }
    
      
      dropdownOptions = (blog) => {
        const status = this.createStatus(blog.status);
    
        return [
          { text: status.view, handlers: { onClick: () => this.changeBlogStatus(status.value, blog._id)}},
          { text: 'Delete', handlers: { onClick: () => this.deleteBlogWarning(blog._id) }}
        ]
      }

      renderBlogs(blogs) {
        return (
          <ul className="user-blogs-list">
           {
            blogs.map((blog, index) => (
              <li key={index}>
                <Link route={`/blogs/${blog._id}/edit`}>
                  <a>{blog.title}</a>
                </Link>
                <PortButtonDropdown items={this.dropdownOptions(blog)} />
              </li>
              )
            )
           }
          </ul>
        )
      }
    
    render() {
        const{blogs}=this.props;
        const {published, drafts} = this.separateBlogs(blogs);
        return (
  
        <BaseLayout {...this.props.auth} headerType={'landing'}>
            <Div className="masthead">
              <div className="overlay"></div>
              <Container>
                <div className="row">
                  <div className="col-lg-8 col-md-10 mx-auto">
                    <div className="site-heading">
                      <h1>Blogs Dashboard</h1>
                      <span className="subheading">¡Write a some blog now! 
                      </span>
                      <div style={{marginTop:"4px"}}>
                      <Link route='/blogs/new'>
                        <Button> Create a New Blog</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </Div>
            <BasePage className="blog-user-page">
            
              <Row>
               <Col md="6" className="mx-auto text-center">
               <h2 className="blog-status-title"> Published Blogs </h2>
               {this.renderBlogs(published)}
               </Col>
               <Col md="6" className="mx-auto text-center">
               <h2 className="blog-status-title"> Draft Blogs </h2>
               {this.renderBlogs(drafts)}
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
export default withAuth('siteOwner')(UserBlogs);