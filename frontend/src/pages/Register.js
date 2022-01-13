import React, { useState, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import {AuthContext} from '../auth'; 

function Register(props){
    const context = useContext(AuthContext);
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const onChange = (event) =>{
        setValues({...values, [event.target.name]: event.target.value});
    }
    const onSubmit = (event) => {
        event.preventDefault();
        registerUser();
    }
    const [registerUser, {loading}] = useMutation(reg_user, {
        update(proxy, {data: {loginUser: user_data}}){
            // console.log(user_data);
            // context.login(user_data);
            window.location = '/login';
        }, 
        variables: values
    })
    return(
        <div class="flex flex-col justify-center items-center">
        <h3 class="block text-orange-500 font-bold md:text-right my-10 text-2xl">Register Here</h3>
        <form onSubmit={onSubmit} class="w-full max-w-sm">
            <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Username: </label>
                    </div>
                    <div class="md:w-2/3">
                        <input type="text" required name="username" value={values.username} onChange={onChange} placeholder='Username...'
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
                        text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                        />
                    </div>
            </div>
            <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Password: </label>
                    </div>
                    <div class="md:w-2/3">
                        <input type="password" required name="password" value={values.password} onChange={onChange} placeholder='Password...'
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
                        text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                        />
                    </div>
            </div>
            <div class="flex flex-col justify-center items-center ">
                <input  class="shadow bg-teal-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" value="Register" />
            </div>
        </form>
    </div>
    )
}

const reg_user = gql`
    mutation RegisterUser($username: String!, $password: String!) {
        registerUser(username: $username, password: $password) {
            username
            token    
        }
    }
`;

export default Register;