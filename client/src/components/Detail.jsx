import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../redux/actions";
import "./Detail.css";
import eggImage from "../img/egg.png";
const Detail = () => {
  const { id } = useParams();
  const error = useSelector((state) => state.error);
  const details = useSelector((state) => state.details);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  let img;
  if (!details.img) {
    img = eggImage;
  } else {
    img = details.img;
  }

  return (
    <section className="details">
      {Object.keys(error).length > 0 && <p className="errors">{error.error}</p>}
      <div className="details-info">
        <h2>{details.name}</h2>
        <span>weight: {details.weight}</span>
        <span>height: {details.height}</span>
        <hr />
        {details.types && typeof details.types[0] !== "object" ? (
          <ul>
            <li>{details.types && details.types[0]}</li>
            {details.types && details.types.length > 1 && (
              <li>{details.types[1]}</li>
            )}
          </ul>
        ) : (
          <ul>
            <li>{details.types && details.types[0].name}</li>
            {details.types && details.types.length > 1 && (
              <li>{details.types[1].name}</li>
            )}
          </ul>
        )}
        <img src={img} alt="details.name" />
      </div>
      <div className="details-stats">
        <ul>
          <li>hp: {details.hp}</li>
          <li>atk: {details.atk}</li>
          <li>def: {details.def}</li>
          <li>spd:{details.spd}</li>
        </ul>
        <hr />
        <p>id: {details.id}</p>
      </div>
    </section>
  );
};

export default Detail;
