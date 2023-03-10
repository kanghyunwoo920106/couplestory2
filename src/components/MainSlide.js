import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { MdClear } from "react-icons/md";

function MainSlide(props) {
  const [index, setIndex] = useState(0);
  let { datas, deleteImgHandle } = props;

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval="100000"
      indicators={false}
    >
      {datas.map((data, i) => {
        return (
          <Carousel.Item key={data.idx}>
            <MdClear
              onClick={() => deleteImgHandle(data.idx)}
              style={{
                position: "absolute",
                right: "3%",
                top: "3%",
                cursor: "pointer",
                zIndex: "10",
                backgroundColor: "white",
                borderRadius: "5px",
                width: "30px",
                height: "30px",
                padding: "5px",
              }}
              size="20"
              color="#ff1a0a"
            />
            <img
              className="d-block w-100"
              src={require(`../../../node-api/uploads/${data.image}`)}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{data.title}</h3>
              <p>{data.description}</p>
              <span className="date">
                {data.startdate.split("T")[0]} ~ {data.enddate.split("T")[0]}
              </span>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default MainSlide;
