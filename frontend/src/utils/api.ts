// src/api.ts
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000/';
console.log('baseUrl:', baseUrl);
const apiUrl = `${baseUrl}api/mishnas`;

export class Api {

    static async markMishnaAsDone(id: number) {
        try {
            const response = await axios.patch(`${apiUrl}/done/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error marking mishna as done:', error);
            throw error; // Propagate the error for further handling
        }
    }

    static async markMishnaAsUndone(id: number) {
        try {
            const response = await axios.patch(`${apiUrl}/revert/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error reverting mishna to undone:', error);
            throw error; // Propagate the error for further handling
        }
    }

    static async resetMishnas() {
        try {
            const response = await axios.get(`${apiUrl}/reset`);
            return response.data;
        } catch (error) {
            console.error('Error resetting mishnas:', error);
            throw error; // Propagate the error for further handling
        }
    }

    static async fetchAllMishnas() {
        try {
            const response = await axios.get(`${apiUrl}/all`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all mishnas:', error);
            throw error; // Propagate the error for further handling
        }
    }

    static async fetchFinishedMishnas() {
        try {
            const response = await axios.get(`${apiUrl}/done`);
            return response.data;
        } catch (error) {
            console.error('Error fetching finished mishnas:', error);
            throw error; // Propagate the error for further handling
        }
    }

    static async fetchUnfinishedMishnas() {
        try {
            const response = await axios.get(`${apiUrl}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching unfinished mishnas:', error);
            throw error; // Propagate the error for further handling
        }
    }
}