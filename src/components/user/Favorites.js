import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavoriteSneakers } from "../../redux/reducer/thunk/sneakerThunk";
import List from "../sneakers/List";
import styles from "./styles/Favorites.module.css";

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.sneakers.favorites);

  useEffect(() => {
    dispatch(fetchFavoriteSneakers());
  }, [dispatch]);

  return (
    <Fragment>
      {favorites.length < 1 && (
        <div className={styles.empty}>
          <i className="fa-solid fa-box-open fa-bounce"></i>
          <span>Is empty!</span>
        </div>
      )}
      {favorites.length > 0 && <List list={favorites} removable={true} />}
    </Fragment>
  );
}

export default Favorites;
