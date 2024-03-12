import { useState, useEffect } from "react";
import { post, getJson } from "../pages/Request.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalCell = (params) => {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const id = params.id;
  const page = params.page;

  //Fetch json from api to gather invoices
  const getData = async () => {
    const request = await getJson(`http://127.0.0.1:3000/${page}/${id}`);
    return request;
  };

  const fetchDataWithId = async () => {
    try {
      const dataDetails = await getData();
      setDescription(dataDetails.details || "No description available.");
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setDescription("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchDataWithId();
  }, [page, id]);

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Open
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ID: {id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Description: {description}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCell;
