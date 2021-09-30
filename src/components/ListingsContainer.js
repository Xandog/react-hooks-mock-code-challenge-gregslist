import React, {useState, useEffect} from "react";
import ListingCard from "./ListingCard";

function ListingsContainer({search}) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/listings")
    .then((res) => res.json())
    .then((listings) => setListings(listings));
  }, [])

  function handleDeleteListing(id){
    const updatedListingsArray = listings.filter(listing => listing.id !== id);
    setListings(updatedListingsArray);
  }

  const filteredListings = listings.filter((listing) => {
    return listing.description.toLowerCase().includes(search.toLowerCase());
  });

  const listingCards = filteredListings.map((listingsObj) => {
    return <ListingCard 
      key={listingsObj.id} 
      listing={listingsObj}
      onDeleteListing={handleDeleteListing}
    />;
  });

  return (
    <main>
      <ul className="cards">
        {listingCards}
      </ul>
    </main>
  );
}

export default ListingsContainer;
