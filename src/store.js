import {configureStore, createSlice} from '@reduxjs/toolkit'
import user from "./store/userSlice";



let stock = createSlice({
    name: 'stock',
    initialState: [10, 11, 12],
})

let wishList = createSlice({
    name: 'wishList',
    initialState: [
        {id: 0, name: 'White and Black', count: 2},
        {id: 1, name: 'Grey Yordan', count: 1}
    ],
    reducers: {
        increase(state, action) {
            if (action.payload === state[action.payload].id) {
                state[action.payload].count += 1;
            }
        },
        add(state, action) {
            let newId = state.length > 0 ? state[state.length - 1].id + 1 : 0;
            let obj = {id: newId, name: action.payload, count: 1}
            state.push(obj);
        },
    }
})
export let {increase, add} = wishList.actions;

export default configureStore({
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
        wishList: wishList.reducer
    }
})