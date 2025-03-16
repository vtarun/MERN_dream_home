import "../styles/list.scss";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import { useState, useEffect, useCallback } from "react";

const PropertyList = () => {
    const user = useSelector((state) => state.user);
    const [propertyList, setPropertyList] = useState([]);
    const userId = user?._id;
    const [loading, setLoading] = useState(true);

    const getPropertyList = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/users/${userId}/properties`);
            const data = await response.json();
            setPropertyList(data.properties);
            setLoading(false);
        } catch (err) {
            console.log("Fetch Property List failed!", err.message);
        }
    }, [userId]);

    useEffect(() => {
        getPropertyList();
    }, [getPropertyList]);

    return loading ? (
        <Loader />
    ) : (
        <>
            <Navbar />
            <h1 className="title-list">Your Property List</h1>
            <div className="list">
                {propertyList.length > 0 && propertyList?.map(
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
                {propertyList.length === 0 && <h3>No Property Found</h3>}
            </div>
            <Footer />
        </>
    );
};

export default PropertyList;