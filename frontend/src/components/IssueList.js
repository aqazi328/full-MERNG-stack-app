import React  from 'react';
import DownVote from './DownVote';
import GetUsername from './GetUsername';
import Title from './Title';
import UpVote from './UpVote';

function IssueList({issue: {title, description, _id, user_id, upvoteCount, downvoteCount}}) {
  const link = 'issues/' + _id;
    return (
      <div >
        <div class="flex-1 w-96 block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 my-3">
          <a href={link} class="no-underline hover:underline text-lg font-bold tracking-tight text-gray-900 dark:text-white"><Title title={title}/></a>
          <h1 class="text-orange-500 text-xs">Posted by <GetUsername _id = {user_id}/></h1>
          <p class="font-normal text-gray-700 dark:text-gray-400">{description}</p>
          <br/>
          {<UpVote id={_id} count={upvoteCount}/>}
          {<DownVote id={_id} count={downvoteCount}/>}
        </div>
      </div>
    )
  }

export default IssueList;