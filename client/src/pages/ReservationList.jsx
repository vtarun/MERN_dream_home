import { useEffect, useState } from "react";
import "../styles/list.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const [reservationList, setReservationList] = useState([]);
  const userId = useSelector((state) => state.user._id);

  const getReservationList = async () => {
    try {
      const response = await fetch(`http://localhost:4000/users/${userId}/reservations`);
      const data = await response.json();
      setReservationList(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Reservation List</h1>
      <div className="list">
        {reservationList.length > 0 && reservationList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking = true }) => (
          <ListingCard
            listingId={listingId._id}
            creator={hostId._id}
            listingPhotoPaths={listingId.listingPhotoPaths}
            city={listingId.location.city}
            province={listingId.location.province}
            country={listingId.location.country}
            category={listingId.category}
            startDate={startDate}
            endDate={endDate}
            totalPrice={totalPrice}
            booking={booking}
          />
        ))}
        {reservationList.length === 0 && <h3>No Reservation List Found</h3>}
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;