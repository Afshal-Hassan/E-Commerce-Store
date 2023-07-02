import { createSlice } from "@reduxjs/toolkit";











const SenderAndReceiverSlice = createSlice({
    name: "senderAndReceiverData",
    initialState: {
        data: {
            messageSender: "",
            messageReceiver: "",
            messageReceiverName: ""
        },
        isLoader: false,
        isError: false,
    },


    reducers: {

        updateSenderAndReceiverData: (state, action) => {
            state.data.messageSender = action.payload.messageSender
            state.data.messageReceiver = action.payload.messageReceiver
            state.data.messageReceiverName = action.payload.messageReceiverName
        }
    }


});



export const { updateSenderAndReceiverData } = SenderAndReceiverSlice.actions;

export default SenderAndReceiverSlice.reducer;