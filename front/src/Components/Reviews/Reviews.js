import { useEffect, useState } from "react";
import axiosInstance from "../../axios";

const Reviews = ({ id }) => {

    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosInstance.get(`products/${id}/reviews/`)
            .then(response => {
                setReviews(response.data);
                console.log(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setIsLoading(false);
            });
    })


    return (
        <div>
            <h1>Reviews</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {reviews.map(review => (
                <div key={review.id}>
                    <h3>{review.rating}</h3>
                    <p>{review.review}</p>
                </div>
            ))}
        </div>
    )
}

export default Reviews;