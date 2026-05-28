// src/data/queries.ts
// This file contains functions to connect and query the database.

import { createClient } from "@libsql/client";

// Post type data structure returned from the function query.
type Post = {
    id: number;
    title: string;
    description: string;
}

// Function to get all posts from the database.
export async function getAllPosts() {
    // Connect to the database
    const client = createClient({
        url: process.env.DB_URL ?? '',
    });

    //Select the fields from the posts table
    const data = await client.execute({
        sql: 'SELECT id, title, description FROM posts'
    });

    client.close();
    return data.rows as unknown as Post[];
}

// Function to get a single post by id from the database
export async function getPost(id: number) {
    const client = createClient({
        url: process.env.DB_URL ?? '',
    });

    const data = await client.execute({
        sql: 'SELECT id, title, description FROM posts WHERE id = ?',
        args: [id], // Pass parameter using ? placeholder
    });

    client.close();

    // If no post is found, return undefined
    if (data.rows.length === 0) {
        return undefined;
    }

    return data.rows[0] as unknown as Post;
}

// Function to get filtered posts from the database
export async function getFilteredPosts(criteria: string) {
    const client = createClient({
        url: process.env.DB_URL ?? '',
    });

    const data = await client.execute({
        sql: 'SELECT id, title, description FROM posts WHERE title LIKE ?',
        args: [`%${criteria}%`], // Pass parameter using % wildcard symbols
    });

    client.close();
    return data.rows as unknown as Post[];
}