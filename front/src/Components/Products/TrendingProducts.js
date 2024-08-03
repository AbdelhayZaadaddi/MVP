import { useEffect, useState } from "react"
import axiosInstance from "../../axios";
import { Link } from "react-router-dom";


const TrendingProducts = () => {
    const [Products, setProducts] = useState([]);
    const [loading, setLoding] = useState(true);

    useEffect(() => {
        axiosInstance.get('products/trending/')
            .then((resp) => {
                setProducts(resp.data);
                setLoding(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="m-5 justify-center items-center">
            <h1 className='text-2xl font-bold text-center m-5 animate-bounce'>Trending Products</h1>
            {loading && <p className="text-center mt-5">Loading...</p>}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 justify-end">
                
                {Products.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`} className="border border-gray-300 rounded p-4 no-underline text-black animate-fadeIn"> 
                        <img src={product.image} alt={product.name} className="w-full h-24 object-cover" />
                        <h2 className="text-sm font-bold mt-2">{product.name}</h2>
                    </Link>
                ))}
            </div>
                    
        </div>
    )

}


export default TrendingProducts;