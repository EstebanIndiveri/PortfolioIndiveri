import React, { Component } from 'react';
import BaseLayout from '../../components/layout/BaseLayout';
import {withRouter} from 'next/router';
import axios from 'axios';
import BasePage from '../../components/BasePage';


 class Portfolio extends Component {
    static async getInitialProps(context){
        let post={};
        const postId=context.query.id
        try {
            const response=await axios.get(`http://jsonplaceholder.typicode.com/posts/${postId}`);
            post=response.data;
        } catch (error) {
            console.log(error);            
        }
        return {post};
    }
    render() {
        const {post}=this.props;//destructuring
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>

                <h1>{post.title}</h1>
                <p>{post.body}</p>
                <span>{post.id}</span>
                </BasePage>

            </BaseLayout>
        )
    }
}
export default withRouter(Portfolio);