import Link from "next/link";

type PostCardProps = {
  post: {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    coverImage?: string;
    category?: { name: string; slug: string };
    publishedAt?: string;
  };
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden flex flex-col">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 flex flex-col flex-grow">
        {post.category && (
          <Link
            href={`/blog/categories/${post.category.slug}`}
            className="text-xs uppercase text-blue-600 font-semibold mb-1"
          >
            {post.category.name}
          </Link>
        )}
        {post.publishedAt && (
          <span className="text-xs text-gray-400 mb-1">
            {new Date(post.publishedAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        )}
        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
        {post.excerpt && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
        )}
        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto inline-block text-blue-600 hover:underline"
        >
          Leer más →
        </Link>
      </div>
    </article>
  );
}