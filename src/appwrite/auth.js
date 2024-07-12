import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId); // Your project ID
        this.account = new Account(this.client)
    } 

    async createAccount({email, password, name}) {
        try {
            const userAcoount = await this.account.create(ID.unique() ,email, password, name)
            if (userAcoount) {
                // return userAcoount;
                // call another method 
                return this.login({email, password});
            } else {
                return userAcoount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            // return await this.account.createEmailSession({email, password});
            // return await this.account.createEmailPasswordSession({email, password});
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
           return await this.account.get();
        } catch (error) {
            // throw error;
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService