import axios from "axios";

import { User } from "../types/User";
import { FormValues } from "../components/WorkExperienceForm/WorkExperienceForm"


axios.defaults.withCredentials = true;

const HOST = 'http://localhost:5000';

const endpoints = {
    cvCollection: `${HOST}/api/cv`,
    cvSpecific:(cvId:string)=>`${HOST}/api/cv/${cvId}`,
    getCV: '/api/cv/',
    create: '/api/cv',
    delete: '/api/cv/delete/',
    edit: '/api/cv/update',
};

const getCV = async (id: string) => await axios.get(`${HOST}${endpoints.getCV}${id}`);


const create = async (data: FormValues): Promise<any> => {
    try {
        // Sending the data to the backend API endpoint for creating the CV
        const response = await axios.post(endpoints.cvCollection, data);
        return response.data;  // Return the data or response from the backend
    } catch (error: any) {
        console.error("Error creating CV:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to create CV.");
    }
};

const edit = async (id: string, data: FormValues): Promise<any> => {
    try {
        // Sending the data to the backend API endpoint for creating the CV
        const response = await axios.put(endpoints.cvSpecific(id), data);
        return response.data;  // Return the data or response from the backend
    } catch (error: any) {
        console.error("Error editing CV:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to edit CV.");
    }
};

const remove = async (id: string) => await axios.delete(`${HOST}${endpoints.delete}${id}`);

export {
    getCV,
    create,
    remove,
    edit,
}