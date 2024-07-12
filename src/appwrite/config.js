import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId); // Your project ID
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, // Your database ID (available from the dashboard)
                conf.appwriteCollectionId,
                slug, // Your document ID (available from the dashboard) or you can use ID.unique() to generate a unique ID for the document.
                // now in that object you can pass further informnation 
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error : ", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId, // Your database ID (available from the dashboard)
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error : ", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId, // Your database ID (available from the dashboard)
                conf.appwriteCollectionId,
                slug,
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error : ", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId, // Your database ID (available from the dashboard)
                conf.appwriteCollectionId,
                slug,
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error : ", error);
            return false;
        }
    }

    // list of posts
    // here basically we show that posts which are actually active so we did that using Query.equal method & here we did that using Index 'status' which I already made in database
    async getPosts(queries = [Query.equal('status', 'active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId, // Your database ID (available from the dashboard)
                conf.appwriteCollectionId,
                queries,
                // or you can write Queries like
                /*[
                    Query.equal('status', 'active')
                ]*/
                // without passing the queries in above 
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error : ", error);
            return false;
        }
    }

    // file upload
    async uploadFile(file){
        try {
            return this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(), // Your file ID (available from the dashboard) or you can use ID.unique() to generate a unique ID for the
                file // file which you want to upload in your bucket and then finally we will get the url of that uploaded
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error : ", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error : ", error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId  
        )
    }


}

const service = new Service();
export default service;