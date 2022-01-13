import React from 'react';
import { gql, useMutation } from '@apollo/client';

function UpVote(props){
    const [upvoteIssue, _] = useMutation(upvoteQuery, {
        variables: {issueId: props.id}
      });
    const onClick = (event) => {
        event.preventDefault();
        upvoteIssue();
        if(window.location.pathname == '/'){window.location = '/';}
        if(window.location.pathname == '/user-issues'){window.location = '/user-issues';}
        if(window.location.pathname.startsWith('/issues/')){window.location = window.location.pathname;}
        console.log();
    }

    return(
        <a href='#' onClick={onClick} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mx-7 border border-orange-500 rounded">
        UpVote | {props.count}</a> 
    );
}

const upvoteQuery = gql`
    mutation UpvoteIssue($issueId: ID!) {
        upvoteIssue(issue_id: $issueId) {
            upvotes {
            username
            }
        }
}
`;

export default UpVote;