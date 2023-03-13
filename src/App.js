import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import MainSlide from "./components/MainSlide";
import Write from "./components/Write";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import MyModal from "./components/MyModal";

function App() {
  const [datas, setDatas] = useState([]);
  const [input, setInput] = useState({ title: "", description: "" });
  const [image, setImage] = useState([]);
  const [showImages, setShowImages] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [postCheck, setPostCheck] = useState(0);
  const [show, setShow] = useState(false);
  const fileInput = useRef();

  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const getPosts = async () => {
    const posts = await axios.get("/getdata");
    setDatas(posts.data.photodata);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleModalSubmit = () => {
    setOpen(false);
    getPosts();
    setShowImages([]);
  };

  const handleRequestCancel = () => {
    setOpen(false);
    getPosts();
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleHide = () => {
    setShow(false);
  };

  const reset = (e) => {
    e.preventDefault();
    axios
      .delete("/reset")
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(true);
    setPostCheck(3);
    setShow(false);
    setInput({ title: "", description: "" });
    getPosts();
  };

  const dateChange = (ranges) => {
    setDate({
      startDate: ranges["selection"].startDate,
      endDate: ranges["selection"].endDate,
      key: ranges["selection"].key,
    });
  };

  const deleteImgHandle = (idx) => {
    axios
      .post("/delete", { idx: idx })
      .then((result) => {
        setOpen(true);
        setPostCheck(2);
        getPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: e.target.value,
    });
  };

  const onImageChange = (e) => {
    if (e.target.files) {
      const uploadFile = e.target.files;
      setImage(uploadFile);

      const imageLists = e.target.files;
      let imageUrlLists = [...showImages];

      for (let i = 0; i < imageLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
      }

      if (imageUrlLists.length > 10) {
        imageUrlLists = imageUrlLists.slice(0, 10);
      }

      setShowImages(imageUrlLists);
    }
  };

  // const handleDeleteImage = (id) => {
  //   setShowImages(showImages.filter((_, index) => index !== id));
  //   setImage(showImages.filter((_, index) => index !== id));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (input.title == "" || input.description == "") {
      setOpen(true);
      setPostCheck(1);
      setShow(false);
      return;
    } else {
      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("startdate", date.startDate.toISOString().split("T")[0]);
      formData.append("enddate", date.endDate.toISOString().split("T")[0]);
      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }

      await axios
        .post("/insert", formData)
        .then((result) => {
          setOpen(true);
          setPostCheck(0);
          setInput({ title: "", description: "" });
          setShow(false);
          setShowImages([]);
          fileInput.current.value = "";
        })
        .catch((err) => {
          setOpen(true);
          setPostCheck(1);
        });
    }
  };

  return (
    <Container>
      <Header
        Write={
          <Write
            handleChange={handleChange}
            onImageChange={onImageChange}
            handleSubmit={handleSubmit}
            input={input}
            fileInput={fileInput}
            showImages={showImages}
            reset={reset}
            // handleDeleteImage={handleDeleteImage}
            date={date}
            dateChange={dateChange}
          />
        }
        MyModal={
          <MyModal
            isOpen={isOpen}
            onSubmit={handleModalSubmit}
            onRequestClose={handleRequestCancel}
            postCheck={postCheck}
          />
        }
        show={show}
        handleShow={handleShow}
        handleHide={handleHide}
      />
      <MainSlide datas={datas} deleteImgHandle={deleteImgHandle} />
    </Container>
  );
}

export default App;
