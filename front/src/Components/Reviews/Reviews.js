import { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { Rating } from "@mui/material";

const Reviews = ({ productId }) => {

    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosInstance.get(`products/${productId}/reviews/`)
            .then(response => {
                setReviews(response.data);
                console.log(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setIsLoading(false);
            });
    }, [productId]);


    return (
        <div className="mt-1">
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="flex mt-2">
                {reviews.map(review => (
                    <div key={review.id} className="m-1 p-1 items-center rounded-md ">
                        <Rating name="read-only" value={review.rating} readOnly />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reviews;