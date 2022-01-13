import React, {useContext} from 'react';
import { gql, useQuery } from '@apollo/client';
import IssueList from '../components/IssueList';
import {AuthContext} from '../auth'; 

function Home(){
    const context = useContext(AuthContext);
    const{loading, data} = useQuery(getIssuesQuery);
    if(context.user){
        return(
            <div class="rounded-t-xl overflow-hidden bg-gradient-to-r p-10 flex flex-col justify-center items-center">
                <h5 class="text-4xl font-bold tracking-tight text-orange-500 ">Climate Issues The World is Talking About</h5>
                <br/>
                {loading ?(<h1>Loading...</h1>):(data.getIssues &&
                data.getIssues.map((issue) => (
                    <div key={issue._id}>
                        <IssueList issue={issue} />
                    </div>
                )))}
            </div>
        )
    }
    else{
        return (
            <div class="rounded-t-xl overflow-hidden bg-gradient-to-r p-10 flex flex-col justify-center items-center">
                <h5 class="text-4xl font-bold tracking-tight text-orange-500 ">Login or Register to see Climate Issues</h5>
            </div>
        )
    }
}

const getIssuesQuery = gql`
    query GetIssues {
        getIssues {
            title description user_id upvoteCount downvoteCount _id
        }
    }
`;
function order(a, b) {
    return a < b ? -1 : (a > b ? 1 : 0);
}


export default Home;