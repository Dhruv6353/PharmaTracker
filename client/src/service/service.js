import axios from 'axios';
import { useState } from 'react';

const url = 'https://pharmatracker-backend.onrender.com/api';

export const authenticateSignup = async (user) => {
    try{
        return await axios.post(`${url}/signin`, user)
    }
    catch(error) {
        console.log('Error while calling signup api', error);
    }
}

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${url}/login`, user);
    }
    catch(error) {
        console.log('Error while calling login api', error);
    }
}

export const medicineAdder = async(medicine) => {
    try {
        return await axios.post(`${url}/medicine/add`, medicine);
    }
    catch(error) {
        console.log('Error while calling medicine adder api', error);
    }
}

export const medicineDelete = async(medicine) => {
    try {
        await axios.post(`${url}/medicine/delete`, medicine);
    }
    catch(error) {
        console.log('Error while calling medicine delete api', error);
    }
}



export const userfind = async (user) => {
    try{
        return await axios.get(`${url}/user/search`, user)
    }
    catch(error) {
        console.log('Error while calling user for shop address', error);
    }
}