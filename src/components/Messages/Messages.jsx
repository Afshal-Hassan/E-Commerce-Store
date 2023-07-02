import React, { memo, useEffect, useState } from 'react'
import "./Messages.css";
import { Layout, Typography, Input, Progress } from 'antd'
import { SendOutlined } from '@ant-design/icons';
import io from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import { updateMessages, getMessagesOfTwoUsers } from '../../services/MessageSlice';



const { Title } = Typography;
const { Text } = Typography;




const socket = io("http://localhost:3001");






function Messages() {


    const dispatch = useDispatch();
    const privateRoomOfUser = useSelector(state => state.privateRoomSlice);
    const senderAndReceiver = useSelector(state => state.senderAndReceiverSlice);
    const messages = useSelector(state => state.messageSlice);



    const [message, setMessage] = useState("");





    const [arrivalMessage, setArrivalMessage] = useState(null);




    const joinRoom = async () => {



        socket.emit("join-room", 1);
        // dispatch(getMessagesOfTwoUsers({


        //     userEmail1: senderAndReceiver.data.messageSender,
        //     userEmail2: senderAndReceiver.data.messageReceiver


        // }))


    }






    const sendMessage = async () => {

        socket.emit("send-message", { message: message, room: privateRoomOfUser.data.id, messageSender: senderAndReceiver.data.messageSender, messageReceiver: senderAndReceiver.data.messageReceiver });
        dispatch(updateMessages({
            email: senderAndReceiver.data.messageSender,
            message: message
        }))





    }






    const receiveMessage = () => {
        socket.off("receive-message").on("receive-message", (data) => {
            setArrivalMessage({
                email: senderAndReceiver.data.messageReceiver, message: data.message
            });
        }, [socket]);
    }







    const onChangeMessageText = (event) => {
        setMessage(event.target.value)
    }




    const sendMessageByEnter = (event) => {
        if (event.key === "Enter") {
            sendMessage();
            setMessage("")
        }
    }






    useEffect(() => {

        joinRoom();
        receiveMessage();
    }, [privateRoomOfUser.data]);







    useEffect(() => {


        arrivalMessage && dispatch(updateMessages(arrivalMessage));


    }, [arrivalMessage]);





    // useEffect(() => {

    // }, [messages])






    return (
        <Layout id='messages-layout'>


            <div id='message-receiver-heading-container'>
                <img src={"https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg"} alt="" id='message-receiver-image' />
                <div id='message-receiver-name-and-active-status-container'>
                    <h4 id='message-receiver-name'>{senderAndReceiver.data.messageReceiverName}</h4>
                    <h6>Active Now</h6>
                </div>
            </div>


            <div id='messages-container'>

                {
                    messages.data && messages.data.map((m, i) => m.email === senderAndReceiver.data.messageSender ? (messages.isLoader == true ? <Progress type="dashboard" percent={50} size={20} className='progress-animation' /> : <div className='outgoing-messages' key={i}>{m.message}</div>) : (messages.isLoader == true ? <Progress type="dashboard" percent={50} size={20} className='progress-animation' /> : <div className='incoming-messages' key={i}>{m.message}</div>))
                }


            </div>


            <div id='messages-input-container'>
                <Input id='type-messages' placeholder='Type Something' autoFocus={true} value={message} onChange={onChangeMessageText} onKeyUp={sendMessageByEnter} />
                <SendOutlined id='send-btn' onClick={sendMessage} />
            </div>


        </Layout>
    )
}

export default memo(Messages)