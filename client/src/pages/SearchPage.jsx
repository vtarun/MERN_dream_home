import { useParams } from "react-router-dom";
import "../styles/list.scss"
import { useSelector,useDispatch  } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader"
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"

const SearchPage = () => {
  const [loading, setLoading] = useState(true)
  const { search } = useParams()
  const listings = useSelector((state) => state.listings)

  const dispatch = useDispatch()

  const getSearchListings = async () => {
    try {
      const response = await fetch(`http://localhost:4000/properties/search/${search}`);

      const data = await response.json()
      dispatch(setListings({ listings: data }))
      setLoading(false)
    } catch (err) {
      console.log("Fetch Search List failed!", err.message)
    }
  }

  useEffect(() => {
    getSearchListings()
  }, [search])
  
  return loading ? <Loader /> : (
    <>
      <Navbar />
      <h1 className="title-list">{search}</h1>
      <div className="list">
        {listings?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            location,
            category,
            type,
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
      </div>
      <Footer />
    </>
  );
}

export default SearchPage