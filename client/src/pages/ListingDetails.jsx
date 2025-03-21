import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import "../styles/listingDetails.scss";
import { useSelector } from "react-redux";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { enGB } from "date-fns/locale";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {facilities} from "../data";

const ListingDetails = () => {
    const [loading, setLoading] = useState(true);
    const [listing, setListing] = useState({});
    const navigate = useNavigate();

    const {listingId} = useParams();

    const getListingDetails = async () => {
        try{
            const response = await fetch('http://localhost:4000/properties/' + listingId);
            const data = await response.json();
            console.log(data);
            setListing(data);
            setLoading(false)
        } catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        getListingDetails();
    }, []);

    /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    // Update the selected date range when user makes a selection
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // Calculate the number of days between the selected dates

  const customerId = useSelector((state) => state?.user?._id);

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.description.price * dayCount,
      }

      const response = await fetch("http://localhost:4000/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm)
      })

      if (response.ok) {
        navigate(`/${customerId}/trips`)
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message)
    }
  }

    return loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          
          <div className="listing-details">
            <div className="title">
              <h1>{listing.title}</h1>
              <div></div>
            </div>
    
            <div className="photos">
              {listing.listingPhotoPaths?.map((item) => (
                <img
                  src={`http://localhost:4000/${item.replace("public", "")}`}
                  alt="listing photo"
                />
              ))}
            </div>
    
            <h2>
              {listing.type} in {listing.city}, {listing.province},{" "}
              {listing.country}
            </h2>
            <p>
              {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
              {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
            </p>
            <hr />
    
            <div className="profile">
              <img
                src={`http://localhost:4000/${listing.creator.profileImagePath.replace(
                  "public",
                  ""
                )}`}
              />
              <h3>
                Hosted by {listing.creator.firstName} {listing.creator.lastName}
              </h3>
            </div>
            <hr />
    
            <h3>Description</h3>
            <p>{listing.description.description}</p>
            <hr />
    
            <h3>{listing.description.highlight}</h3>
            <p>{listing.description.highlightDesc}</p>
            <hr />
    
            <div className="booking">
              <div>
                <h2>What this place offers?</h2>
                <div className="amenities">
                  {listing.amenities[0].split(",").map((item, index) => (
                    <div className="facility" key={index}>
                      <div className="facility_icon">
                        {
                          facilities.find((facility) => facility.name === item)
                            ?.icon
                        }
                      </div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
    
              <div>
                <h2>How long do you want to stay?</h2>
                <div className="date-range-calendar">
                  <DateRange ranges={dateRange} locale={enGB}  onChange={handleSelect} />
                  {dayCount > 1 ? (
                    <h2>
                      ${listing.description.price} x {dayCount} nights
                    </h2>
                  ) : (
                    <h2>
                      ${listing.description.price} x {dayCount} night
                    </h2>
                  )}
    
                  <h2>Total price: ${listing.description.price * dayCount}</h2>
                  <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
                  <p>End Date: {dateRange[0].endDate.toDateString()}</p>
    
                  <button className="button" type="submit" onClick={handleSubmit}>
                    BOOKING
                  </button>
                </div>
              </div>
            </div>
          </div>
    
          {/* <Footer /> */}
        </>
      );
    };

export default ListingDetails
