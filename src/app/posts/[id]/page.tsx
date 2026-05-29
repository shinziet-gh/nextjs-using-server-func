import { getPost } from '@/data/queries';
import { notFound } from 'next/navigation';

export default async function Post({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = Number((await params).id);
    if (!Number.isInteger(id)) {
        notFound();
    }
    const post = await getPost(id);
    if (!post) {
        notFound();
    }

    return (
        <main>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
        </main>
    );
}