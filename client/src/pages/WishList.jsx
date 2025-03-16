import "../styles/list.scss";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import { useState, useEffect } from "react";

const WishList = () => {
    const user = useSelector((state) => state.user);
    const [wishList, setWishList] = useState([]);
    const userId = user?._id;
    const [loading, setLoading] = useState(true);

    const getWishList = async () => {
        try {
            const response = await fetch(`http://localhost:4000/users/${userId}/wishlists`);
            const data = await response.json();
            setWishList(data.wishList);
            setLoading(false);
        } catch (err) {
            console.log("Fetch Trip List failed!", err.message);
        }
    };

    useEffect(() => {
        getWishList();
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <>
            <Navbar />
            <h1 className="title-list">Your Wish List</h1>
            <div className="list">
                {wishList.length > 0 && wishList?.map(
                    ({
                        _id,
                        creator,
                        listingPhotoPaths,                        
                        category,
                        type,
                        location,
                        description,
                        booking = false,
                    }) => (
                        <ListingCard
                            listingId={_id}
                            creator={creator}
                            listingPhotoPaths={listingPhotoPaths}
                            city={location.city}
                            province={location.province}
                            country={location.country}
                            category={category}
                            type={type}
                            price={description.price}
                            booking={booking}
                        />
                    )
                )}
                {wishList.length === 0 && <h3>No Wish List Found</h3>}
            </div>
            <Footer />
        </>
    );
};

export default WishList;