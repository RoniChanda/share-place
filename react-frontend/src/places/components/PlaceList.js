import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";

import classes from "./PlaceList.module.css";
import { useState, useContext, useEffect } from "react";

function PlaceList(props) {
  const [isUser, setIsUser] = useState(false);
  const { userId } = useContext(AuthContext);

  const { userId: uid } = props;

  useEffect(() => {
    if (uid === userId) {
      setIsUser(true);
    }
  }, [userId, uid]);

  if (props.items.length === 0) {
    return (
      <div className={`center ${classes["place-list"]}`}>
        <Card>
          {isUser ? (
            <h2>No places found in your list. Maybe create one?</h2>
          ) : (
            <h2>No places found for this user.</h2>
          )}
          {isUser ? (
            <Button to="/places/new">Add Place</Button>
          ) : (
            <Button to={`/${userId}/places`}>Go to your places</Button>
          )}
        </Card>
      </div>
    );
  }

  return (
    <ul className={classes["place-list"]}>
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          address={place.address}
          description={place.description}
          coordinates={place.location}
          creatorId={place.creator}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
}

export default PlaceList;
