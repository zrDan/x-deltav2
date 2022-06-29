import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSneakers,
  fetchBrands,
} from "../../redux/reducer/thunk/sneakerThunk";
import List from "./List";
import Loading from "../UI/Loading";

function SneakerList() {
  const dispatch = useDispatch();
  const sneakerList = useSelector((state) => state.sneakers.list);
  const status = useSelector((state) => state.sneakers.status.list);

  useEffect(() => {
    if (sneakerList.length === 0) {
      dispatch(fetchAllSneakers());
      dispatch(fetchBrands());
    }
  }, [dispatch, sneakerList]);

  return (
    <Fragment>
      {status === "loading" && <Loading />}
      {status === "error" && <p>Error!</p>}
      {status === "success" && <List list={sneakerList} removable={false} />}
    </Fragment>
  );
}

export default SneakerList;
