import React, { Fragment } from 'react';
import Header from './Header';
import Head from 'next/head';

const BaseLayout=(props)=>{
    const{children,className,isAuthenticated,user,isSiteOwner,title,cannonical}=props;
    const headerType=props.headerType || 'default';
    return(
        <Fragment>
            <Head>
                {title?(<title>Esteban Indiveri</title>):<title>Esteban Indiver - Portfolio</title>}
                
                <meta name="description" content="My name is Esteban and I am an experienced software engineer and freelance developer. I have a experience working on a wide range of technologies and projects in C#,Flutter,Kotlin, and web applications created with Javascript in React and Angular. Throughout my career, I have acquired advanced technical knowledge and the ability to explain programming topics clearly and in detail to a broad audience. I invite you to view my work and contact with me."/>

                <meta name="keywords" content="Esteban indiveri,Esteban Freelance,Esteban Indiveri developer"/>

                <meta property="og:title" content="Esteban Indiveri - Developer, Designer UX/UI" />
                <meta property="og:locale" content="es_ARS" />
                <meta property="og:url" content={`${process.env.NAMESPACE}`} />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="My name is Esteban and I am an experienced software engineer and freelance developer. I have a experience working on a wide range of technologies and projects in C#,Flutter,Kotlin, and web applications created with Javascript in React and Angular." />
                <link rel="icon" type="image/ico" href="/static/favicon.png" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"/>
                {cannonical &&<link rel="cannonical" href={`${process.env.NAMESPACE}${cannonical}`}></link>}
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            
            </Head>
        <div className="layout-container" >
        <Header className={`port-nav-${headerType}`} 
                isAuthenticated={isAuthenticated} 
                user={user} 
                isSiteOwner={isSiteOwner}
                />
        <main className={`cover ${className}`}>
            <div className="wrapper">
            {children}
            </div>
        </main>
        </div>
        </Fragment>
    )
}
export default BaseLayout;