import { getPost } from '@/data/queries';

export default async function PostDetail({
    id,
}: {
    id: number;
}) {
    const post = await getPost(id);
    if (!post) {
        return <p>Post not found</p>;
    }

    return (
        <main>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
        </main>
    );
}