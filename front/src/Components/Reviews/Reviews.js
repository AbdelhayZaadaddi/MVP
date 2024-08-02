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
        </div>
    )
}

export default Reviews;