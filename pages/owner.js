import React, { Component } from 'react'
import BaseLayout from '../components/layout/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';

class Owner extends Component {
    render() {
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>

                    <h1>Owner page</h1>
                </BasePage>

            </BaseLayout>
        )
    }
}
export default withAuth('siteOwner')(Owner);