import { User, type Review } from "@prisma/client"

export default function Review({ review, user }: { review: Review, user: User }) {
    return (<div className="border rounded-lg p-4">
        <div className="flex justify-between">
            <h4 className="font-medium">{user.name}</h4>
            <div className="flex">
                {Array.from({ length: review.rating }, (_, index) => (
                    <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-yellow-500"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                        />
                    </svg>
                ))}
            </div>
        </div>
        <p className="mt-2 text-sm">
            {review.content}
        </p>
    </div>)
}
