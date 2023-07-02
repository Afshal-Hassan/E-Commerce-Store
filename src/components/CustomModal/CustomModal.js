import React from 'react'
import { Modal, Form, Input } from "antd";
import ImageIcon from '@mui/icons-material/Image';
import "./CustomModal.css"



function CustomModal(props) {



    const chooseFile = (event) => {
        const file = event.target.files[0];

        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            console.log(fileReader.result);
        }

    }






    return (
        <Modal title="Update Product" open={props.isModalOpen} onCancel={props.handleCancel} okText="Update"

            okButtonProps={{
                style: {
                    color: "#ffffff",
                    backgroundColor: "#8323ff "
                }
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

                <Form.Item className='qr--modal-form-item'
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 30 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a product image',
                        },
                    ]}
                >

                    <label htmlFor='image-upload'><ImageIcon id='image-upload-icon' /></label>
                    <input type='file' id='image-upload' onChange={chooseFile} accept="image/png, image/jpeg" />
                </Form.Item>
                <Form.Item
                    label="Name"
                    name="productName"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a product name',
                        },
                    ]}
                    className='qr--modal-form-item'
                >
                    <Input />
                </Form.Item>



                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a price',
                        },
                    ]}
                    className='qr--modal-form-item'
                >
                    <Input />
                </Form.Item>


            </Form>



        </Modal>
    )
}

export default CustomModal