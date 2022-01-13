import React, { useState, useContext, useRef } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import GetUsername from '../components/GetUsername';
import DownVote from '../components/DownVote';
import UpVote from '../components/UpVote';
import AddComment from '../components/AddComment';

function Issue(props){
    const issue_id = window.location.pathname.substr(8)
    const issues = useQuery(getIssueQuery, {
        variables: {issueId: issue_id},
        skip: !issue_id
      });
    
      const comments = useQuery(getCommentsQuery, {
        variables: {var1: issue_id},
        skip: issues.loading || !issues.data?.getIssue
      });
    
      const loading = issues.loading || comments.loading;
    
      if (loading) {
        return <p>loading...</p>;
      }
    
    return(
        <div>
            {loading ?(<h1>Loading...</h1>):(                        
            <div class="rounded-t-xl overflow-hidden bg-gradient-to-r p-10 flex flex-col justify-center items-center">
                <div class="flex-1 w-96 block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 my-3">
                <h5 class="text-lg font-bold tracking-tight text-gray-900 dark:text-white">{issues.data.getIssue.title}</h5>
                <h1 class="text-orange-500 text-xs">Posted by <GetUsername _id = {issues.data.getIssue.user_id}/></h1>
                <p class="font-normal text-gray-700 dark:text-gray-400">{issues.data.getIssue.description}</p>
                <br/>
                {<UpVote id={issues.data.getIssue._id} count={issues.data.getIssue.upvoteCount}/>}
                {<DownVote id={issues.data.getIssue._id} count={issues.data.getIssue.downvoteCount}/>}
                <br/>
                <br/>
                {<AddComment id={issues.data.getIssue._id}/>}
                <br/>
                <br/>
                <br/>
                <h6 class="text-3xl font-bold tracking-tight text-orange-500 dark:text-white"> Comments </h6>
                <br/>
                <div>
                    {loading ?(<h1>Loading...</h1>):(comments.data.getCommentsbyIssue &&
                    comments.data.getCommentsbyIssue.map((comment) => (
                        <div key={comment.text}>
                                <div >
                                {/* <h4 class="text-sm font-bold tracking-tight text-teal-500 dark:text-teal-500">Posted by:</h4> */}
                                <h3 class="text-sm font-bold tracking-tight text-gray-700 dark:text-teal-500">{comment.user_id}</h3>
                                <p class="text-lg font-normal text-gray-900 dark:text-gray-100">{comment.text}</p>
                                <br/>
                            </div>
                        </div>
                    )))}
                </div>
                </div>
            </div>)}
        </div>
    )
}

const getIssueQuery = gql`
    query GetIssue($issueId: ID!) {
        getIssue(issue_id: $issueId) {
            title
            description
            upvoteCount
            downvoteCount
            _id
            user_id
        }
  }
`;

const getCommentsQuery = gql`
    query GetCommentsbyIssue($var1: ID!) {
        getCommentsbyIssue(issue_id: $var1) {
            user_id
            text
        }
    }
`;


export default Issue;