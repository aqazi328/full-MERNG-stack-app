import React, { useState, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import {AuthContext} from '../auth';

function AddIssue(){
    const [data, setUser_id] = useState(useContext(AuthContext));
    const [values, setValues] = useState({
        title: '',
        description: ''
    })
    const [addIssue, {loading}] = useMutation(addIssueQuery, {
        variables: values,
        update(proxy, result){
            // console.log(user_data);
            // context.login(user_data);
            window.location = '/';
        }, 
    });
    const onChange = (event) =>{
        setValues({...values, [event.target.name]: event.target.value});
    }
    const onSubmit = (event) => {
        event.preventDefault();
        addIssue();
    }
    return(
        <div class="flex flex-col justify-center items-center bg-slate-900">
        <h3 class="block text-orange-500 font-bold md:text-right my-10 text-2xl">Add a New Issue</h3>
        <form onSubmit={onSubmit} class="w-full max-w-sm">
            <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Title: </label>
                    </div>
                    <div class="md:w-2/3">
                        <input type="text" required name="title" value={values.title} onChange={onChange} placeholder='Title'
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
                        text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                        />
                    </div>
            </div>
            <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Description: </label>
                    </div>
                    <div class="md:w-2/3">
                        <input type="text" required name="description" value={values.description} onChange={onChange} placeholder='description...'
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
                        text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                        />
                    </div>
            </div>
            <div class="flex flex-col justify-center items-center ">
                <input class="shadow bg-teal-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" value="Add Issue" />
            </div>
        </form>
    </div>
    )
}

const addIssueQuery = gql`
    mutation AddIssue($title: String!, $description: String!) {
        addIssue(title: $title, description: $description) {
            title
            description
        }
    }
`;

export default AddIssue;