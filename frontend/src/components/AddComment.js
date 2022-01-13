import React, {useState} from 'react';
import { gql, useMutation } from '@apollo/client';

function AddComment(props){
    const [comment, setComment] = useState('')
    const [addComment, _] = useMutation(addCommentQuery, {
        variables: {
            id: props.id,
            text: comment
        }
      });

    const onChange = (event) =>{
        setComment(event.target.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        addComment();
        window.location = window.location.pathname
    }
    

    return(
        <form onSubmit={onSubmit} class="w-full max-w-sm">
        <div >
            <input type="text" required name="text" value={comment} onChange={onChange} placeholder='your comment...'
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
            text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
            />
        </div>
        <br/>
        <input type="submit" value="Add Comment" class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-20 ml-9 border border-orange-500 rounded "/>
    </form>
    );
}

const addCommentQuery = gql`
    mutation AddComment($text: String!, $id: ID!) {
        addComment(text: $text, issue_id: $id) {
            text
        }
    }
`;


export default AddComment;