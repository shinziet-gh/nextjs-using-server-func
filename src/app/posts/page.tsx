import Link from 'next/link';
import {
    getAllPosts,
    getFilteredPosts,
} from '@/data/queries';

export default async function Posts({
    searchParams,
}: {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}) {
    const criteria = (await searchParams).criteria;
    const resolvedPosts =
        typeof criteria === 'string'
            ? await getFilteredPosts(criteria)
            : await getAllPosts();
    const resolvedHeading =
        typeof criteria === 'string'
            ? `Posts for ${criteria}`
            : 'Posts';

    return (
        <main>
            <h2>{resolvedHeading}</h2>
            <ul>
                {resolvedPosts.map((post) => (
                    <li key={post.id}>
                        <Link href={`/posts/${post.id}`}>
                            {post.title}
                        </Link>
                        <p>{post.description}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}