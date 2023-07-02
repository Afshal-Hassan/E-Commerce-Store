import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import ImageIcon from "@mui/icons-material/Image";
import "./CustomModal.css";

function CustomModal({
  setProductName,
  setPrice,
  price,
  productName,
  isModalOpen,
  handleCancel,
}) {
  const chooseFile = (event) => {
    const file = event.target.files[0];

    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      console.log(fileReader.result);
    };
  };
  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <Modal
      title="Update Product"
      open={isModalOpen}
      onCancel={handleCancel}
      okText="Update"
      okButtonProps={{
        style: {
          color: "#ffffff",
          backgroundColor: "#8323ff ",
        },
      }}
      closable={false}
    >
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 18,
        }}
        autoComplete="off"
      >
        <Form.Item
          className="qr--modal-form-item"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
          }}
          rules={[
            {
              required: true,
              message: "Please enter a product image",
            },
          ]}
        >
          <label htmlFor="image-upload">
            <ImageIcon id="image-upload-icon" />
          </label>
          <input
            type="file"
            id="image-upload"
            onChange={chooseFile}
            accept="image/png, image/jpeg"
          />
        </Form.Item>
        <Form.Item
          label="Name"
          name="productName"
          rules={[
            {
              required: true,
              message: "Please enter a product name",
            },
          ]}
          className="qr--modal-form-item"
        >
          <Input value={productName} onChange={handleProductNameChange} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input a price",
            },
          ]}
          className="qr--modal-form-item"
        >
          <Input value={price} onChange={handlePriceChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CustomModal;
