// src/api.ts
import axios from 'axios';

const baseUrl = 'http://localhost:4000';

export class Api {

    static async markMishnaAsDone(id: number) {
        try {
            const response = await axios.patch(`${baseUrl}/api/mishnas/done/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error marking mishna as done:', error);
            throw error; // Propagate the error for further handling
        }
    }

    static async markMishnaAsUndone(id: number) {
        try {
            const response = await axios.patch(`${baseUrl}/api/mishnas/revert/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error reverting mishna to undone:', error);
            throw error; // Propagate the error for further handling
        }
    }

    static async resetMishnas() {
        try {
            const response = await axios.get(`${baseUrl}/api/mishnas/reset`);
            return response.data;
        } catch (error) {
            console.error('Error resetting mishnas:', error);
            throw error; // Propagate the error for further handling
        }
    }

    static async fetchAllMishnas() {
        try {
            const response = await axios.get(`${baseUrl}/api/mishnas/all`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all mishnas:', error);
            throw error; // Propagate the error for further handling
        }
    }

    static async fetchFinishedMishnas() {
        try {
            const response = await axios.get(`${baseUrl}/api/mishnas/done`);
            return response.data;
        } catch (error) {
            console.error('Error fetching finished mishnas:', error);
            throw error; // Propagate the error for further handling
        }
    }

    static async fetchUnfinishedMishnas() {
        try {
            const response = await axios.get(`${baseUrl}/api/mishnas`);
            return response.data;
        } catch (error) {
            console.error('Error fetching unfinished mishnas:', error);
            throw error; // Propagate the error for further handling
        }
    }
}