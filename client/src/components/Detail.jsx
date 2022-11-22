import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../redux/actions";
import "./Detail.css";
const Detail = () => {
  const { id } = useParams();
  const details = useSelector((state) => state.details);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  let img;
  if (!details.img) {
    img = "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif";
  } else {
    img = details.img;
  }

  return (
    <section className="details">
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
