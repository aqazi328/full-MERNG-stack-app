import React from 'react';
import { gql, useMutation } from '@apollo/client';

function DownVote(props){
    const [downvoteIssue, _] = useMutation(downvoteQuery, {
        variables: {issueId: props.id}
      });
    const onClick = (event) => {
        event.preventDefault();
        downvoteIssue();
        if(window.location.pathname == '/'){window.location = '/';}
        if(window.location.pathname == '/user-issues'){window.location = '/user-issues';}
        if(window.location.pathname.startsWith('/issues/')){window.location = window.location.pathname;}
    }

    return(
        <a href='#' onClick={onClick} class="bg-red-700 hover:bg-red-900 text-white font-bold py-1 px-2 mx-7 border border-orange-500 rounded">
        DownVote | {props.count}</a> 
    );
}

const downvoteQuery = gql`
    mutation DownvoteIssue($issueId: ID!) {
        downvoteIssue(issue_id: $issueId) {
            downvotes {
            username
            }
        }
}
`;

export default DownVote;