import {createSlice, current, PayloadAction} from '@reduxjs/toolkit'
import {SubmitPropsType} from '../../pages/New'

const initialState: InitialState = {
    list: [
        {_id: 1, name: 'Таня Грин (Олайнфарм)', date: 216080395000},
        {_id: 2, name: 'Антон Автовинил', date: 416080000000},
        {_id: 3, name: 'Руслан Рефреш', date: 516080312345},
    ],
    editId: null
}

export const birthdaySlice = createSlice({
    name: 'birthday',
    initialState,
    reducers: {
        changeBirthdayItem: (state, action: PayloadAction<number | null>) => {
            state.list[0].date = action.payload
            console.log(state.list[0].date)
        },
        addBirthdayItem: (state, action: PayloadAction<SubmitPropsType>) => {
            state.list.push({_id: 4, name: action.payload.name, date: action.payload.date})
            console.log(current(state))
            console.log(action)
        },
        deleteBirthdayItem: (state, action: PayloadAction<number>) => {
            state.list.splice(action.payload, 1)
        },
        changeIdOfEditItem: (state, action: PayloadAction<number>) => {
            state.editId = action.payload
            console.log(state.editId)
        },
    },
})

// Action creators are generated for each case reducer function
export const {changeBirthdayItem, deleteBirthdayItem, addBirthdayItem, changeIdOfEditItem} = birthdaySlice.actions

export default birthdaySlice.reducer

//Types
type InitialState = {
    list: {
        _id: number,
        name: string
        date: number | null
    }[],
    editId: number | null
}