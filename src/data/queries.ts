// src/data/queries.ts
// This file contains functions to connect and query the database.

import { createClient } from "@libsql/client";
import { postSchema, postsSchema } from "./schema";

async function delay() {
    await new Promise((resolve) =>
        setTimeout(resolve, 1000));
}

// Function to get all posts from the database.
export async function getAllPosts() {
    // Simulate a delay
    await delay();

    // Connect to the database
    const client = createClient({
        url: process.env.DB_URL ?? '',
    });

    //Select the fields from the posts table
    const data = await client.execute({
        sql: 'SELECT id, title, description FROM posts'
    });

    client.close();
    return postsSchema.parse(data.rows);
}

// Function to get a single post by id from the database
export async function getPost(id: number) {
    // Simulate a delay
    await delay();
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

    return postSchema.parse(data.rows[0]);
}

// Function to get filtered posts from the database
export async function getFilteredPosts(criteria: string) {
    // Simulate a delay
    await delay();
    const client = createClient({
        url: process.env.DB_URL ?? '',
    });

    const data = await client.execute({
        sql: 'SELECT id, title, description FROM posts WHERE title LIKE ?',
        args: [`%${criteria}%`], // Pass parameter using % wildcard symbols
    });

    client.close();
    return postsSchema.parse(data.rows);
}