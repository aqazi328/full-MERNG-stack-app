import React from 'react';
import { gql, useQuery } from '@apollo/client';

function GetUsername({_id}){
    const {loading, data} = useQuery(getUsernameQuery, {
        variables: {id: _id},
    });
    if(data){console.log(data);}
    return(loading ?(<h1>Loading...</h1>):(data.getUser && <>{data.getUser.username}</>))
}


const getUsernameQuery = gql `
    query GetUser($id: ID!) {
        getUser(_id: $id) {
            username
        }
    }
`;


export default GetUsername;
