import React from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Card from "../UI/Card";
import styles from "./styles/SneakerCard.module.css";
import { deleteFavoritePair } from "../../redux/reducer/thunk/sneakerThunk";

function SneakerCard({ product, removable }) {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const brandImage = useSelector(
    (state) => state.sneakers.brands[product.brand]
  );

  const productHandler = () => {
    navigation(`/product/${product.brand}/${product.category}/${product.id}`, {
      replace: false,
    });
  };

  const removeFavoriteHandler = () => {
    dispatch(deleteFavoritePair(product));
  };

  return (
    <Card>
      <div className={styles.container}>
        <div className={removable ? styles.removable : styles.brand}>
          {removable && (
            <i
              className="fa-solid fa-trash"
              onClick={removeFavoriteHandler}
            ></i>
          )}
          <img src={brandImage} alt={product.brand} onClick={productHandler} />
        </div>
        <div className={styles.picture}>
          <img
            src={product.image}
            alt={product.name}
            onClick={productHandler}
          />
        </div>
        <div className={styles.info} onClick={productHandler}>
          <div className={styles.details}>
            <p>{product.name}</p>
            <p>{product.type}</p>
          </div>
          <div className={styles.price}>
            <p>{product.price}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default SneakerCard;
