import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";





export const getPrivateRoomOfUser = createAsyncThunk("privateRoomOfUser", async (data) => {
    try {
        const response = await axios.get(`http://localhost:3001/private-room/key/${data.clickByUserEmail}/${data.clickOnUserEmail}`);
        return response.data.data[0]
    } catch (error) {
        console.log(error);
        throw error;
    }
});





const PrivateRoomSlice = createSlice({
    name: "privateRoomOfUser",
    initialState: {
        data: {},
        isLoader: false,
        isError: false,
    },

    extraReducers: (builder) => {
        builder.addCase(getPrivateRoomOfUser.pending, (state, action) => {
            state.isLoader = true;
        });

        builder.addCase(getPrivateRoomOfUser.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });

        builder.addCase(getPrivateRoomOfUser.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
        });
    },
});





export default PrivateRoomSlice.reducer;