import { createSlice } from '@reduxjs/toolkit'

import {User} from '@Models';

const initialState: User = {
    id: '',
    name: '',
    avatar: '',
    role: '',
    phone: '',
    email: '',
    verified: false,
    address: '',
    active: false,
    gender: '',
    dateOfBirth: ''
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.avatar = action.payload.imageId || 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'
            state.role = action.payload.role
            state.phone = action.payload.phone
            state.email = action.payload.email
            state.verified = action.payload.verified
            state.address = action.payload.address
            state.active = action.payload.active
            state.gender = action.payload.gender
            state.dateOfBirth = action.payload.dateOfBirth
        },
        updateUser: (state, action) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.avatar = action.payload.imageId || 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'
            state.role = action.payload.role
            state.phone = action.payload.phone
            state.email = action.payload.email
            state.verified = action.payload.verified
            state.address = action.payload.address
            state.active = action.payload.active
            state.gender = action.payload.gender
            state.dateOfBirth = action.payload.dateOfBirth
        },
        clearUser: (state) => {
            Object.assign(state, initialState);
        }
    }
})

export const {setUser, updateUser, clearUser} = userSlice.actions
export const selectUser = (state: { user: User }) => state.user;

export default userSlice.reducer;