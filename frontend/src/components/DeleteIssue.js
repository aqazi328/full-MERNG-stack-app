import React from 'react';
import { gql, useMutation } from '@apollo/client';

function DeleteIssue(props){
    const [deleteIssue, _] = useMutation(deleteIssueQuery, {
        variables: {id: props.id}
      });
    const onClick = (event) => {
        event.preventDefault();
        deleteIssue();
        window.location = '/user-issues'
    }

    return(
        <a href='#' onClick={onClick} class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-20 ml-9 border border-orange-500 rounded">
        Delete Issue</a>
    );
}

const deleteIssueQuery = gql`
    mutation DeleteIssue($id: ID!) {
        deleteIssue(issue_id: $id)
    }
`;


export default DeleteIssue;