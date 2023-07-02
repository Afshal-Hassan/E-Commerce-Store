import { configureStore } from "@reduxjs/toolkit";
import messageSlice from "./services/MessageSlice";
import privateRoomSlice from "./services/PrivateRoomSlice";
import senderAndReceiverSlice from "./services/SenderAndReceiverSlice";





const store = configureStore({
    reducer: {
        messageSlice: messageSlice,
        privateRoomSlice: privateRoomSlice,
        senderAndReceiverSlice: senderAndReceiverSlice

    }
})


export default store;