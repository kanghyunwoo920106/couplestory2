import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MdClear } from "react-icons/md";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function Write(props) {
  let {
    datas,
    handleChange,
    onImageChange,
    handleSubmit,
    input,
    fileInput,
    showImages,
    handleDeleteImage,
    reset,
    date,
    dateChange,
  } = props;
  return (
    <Form
      method="POST"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="mt-3"
    >
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>제목</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="제목"
          onChange={handleChange}
          value={input.title}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>내용</Form.Label>
        <Form.Control
          name="description"
          as="textarea"
          rows={3}
          onChange={handleChange}
          value={input.description}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>날짜</Form.Label>
        <DateRange
          editableDateInputs={true}
          onChange={dateChange}
          ranges={[date]}
          moveRangeOnFirstSelection={false}
        />
      </Form.Group>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Control
          name="image"
          type="file"
          onChange={onImageChange}
          ref={fileInput}
          multiple
        />
      </Form.Group>
      <div>
        {showImages.map((image, id) => (
          <div key={id} className="previewImg-wrap">
            <img src={image} alt={`${image}-${id}`} />
            {/* <MdClear onClick={() => handleDeleteImage(id)} /> */}
          </div>
        ))}
      </div>
      <Button type="submit" style={{ width: "100%" }}>
        글등록
      </Button>
      <Button
        onClick={reset}
        type="submit"
        style={{ width: "100%", marginTop: "5px" }}
      >
        초기화
      </Button>
    </Form>
  );
}

export default Write;
