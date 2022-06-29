import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSneakersByProduct,
  postSneakersToFavorites,
} from "../../redux/reducer/thunk/sneakerThunk";
import styles from "./styles/Sneaker.module.css";
import Loading from "../UI/Loading";

function Sneaker() {
  const [isAdded, setIsAdded] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sneakers = useSelector((state) => state.sneakers.pair);
  const status = useSelector((state) => state.sneakers.status.pair);
  const authenticated = useSelector((state) => state.auth.authenticated);

  const favoritesHandler = () => {
    if (authenticated) {
      setIsAdded(true);
      postSneakersToFavorites(sneakers);
    } else {
      navigate("/auth", { replace: false });
    }
  };

  useEffect(() => {
    dispatch(fetchSneakersByProduct(params));
  }, [dispatch, params]);

  return (
    <div className={styles.sneakers}>
      {status === "loading" && (
        <div className={styles.spiner}>
          <Loading />
        </div>
      )}
      {status === "error" && <p>Error!</p>}
      {status === "success" && (
        <React.Fragment>
          <div className={styles.picture}>
            <img src={sneakers.image} alt={sneakers.name} />
          </div>
          <div className={styles.details}>
            <div className={styles.info}>
              <div className={styles.name}>
                <div>
                  <p>{sneakers.name}</p>
                  <p>{sneakers.type}</p>
                </div>
                <div>
                  {sneakers.brandImage ? (
                    <img src={sneakers.brandImage} alt="brand" />
                  ) : (
                    <p>{sneakers.brand}</p>
                  )}
                </div>
              </div>
              <div className={styles.description}>
                <p>{sneakers.description}</p>
                <p>
                  Released in <span>{sneakers.release}</span>
                </p>
              </div>
            </div>
            <div
              className={`${styles.price} ${isAdded ? styles.added : ""}`}
              onClick={favoritesHandler}
            >
              <span>Add to favorites</span>
              <p>{sneakers.price}</p>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default Sneaker;
