import React, { useState, useContext } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import {AuthContext} from '../auth';
import DownVote from '../components/DownVote';
import UpVote from '../components/UpVote';
import DeleteIssue from '../components/DeleteIssue';

function UserIssues(){
    const [user_id, setUser_id] = useState(useContext(AuthContext).user._id);
    const {loading, error, data} = useQuery(getIssuesQuery, {
        variables: {userId: user_id},
    });

    return(
        <div class="rounded-t-xl overflow-hidden bg-gradient-to-r p-10 flex flex-col justify-center items-center">
            <h5 class="text-4xl font-bold tracking-tight text-orange-500 ">My Posts</h5>
            <br/>
            {loading ?(<h1>Loading...</h1>):(data.getIssuesbyUser &&
              data.getIssuesbyUser.map((issue) => (
                  <div key={issue._id}>
                        <div >
                        <div class="flex-1 w-96 block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 my-3">
                        <a href={'issues/' + issue._id} class="no-underline hover:underline text-lg font-bold tracking-tight text-gray-900 dark:text-white">{issue.title}</a>
                        <p class="font-normal text-gray-700 dark:text-gray-400">{issue.description}</p>
                        <br/>
                        {<UpVote id={issue._id} count={issue.upvoteCount}/>}
                        {<DownVote id={issue._id} count={issue.downvoteCount}/>}
                        <br/>
                        <br/>
                        <br/>
                        {<DeleteIssue id={issue._id}/>}
                        </div>
                    </div>
                  </div>
              )))}
        </div>
    )
}

const getIssuesQuery = gql`
    query GetIssuesbyUser($userId: ID!) {
        getIssuesbyUser(user_id: $userId) {
            title
            description
            upvoteCount
            downvoteCount
            user_id
            _id
        }
    }
`;

// const deleteIssueQuery = gql`
//     mutation DeleteIssue($id: ID!) {
//         deleteIssue(issue_id: $id)
//     }
// `;

export default UserIssues;