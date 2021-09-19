import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface BirthdayState {
    list: {
        _id: number,
        name: string
        date: number | null
    }[]
}

const initialState: BirthdayState = {
    list: [
        {_id: 1, name: 'Таня Грин (Олайнфарм)', date: 216080395000},
        {_id: 2, name: 'Антон Автовинил', date: 416080000000},
        {_id: 3, name: 'Руслан Рефреш', date: 516080312345},
    ],
}

export const birthdaySlice = createSlice({
    name: 'birthday',
    initialState,
    reducers: {
        changeBirthdayItem: (state, action: PayloadAction<number | null>) => {
            state.list[0].date = action.payload
            console.log(state.list[0].date)
        },
        deleteBirthdayItem: (state, action: PayloadAction<number> ) => {
            state.list.splice(action.payload, 1)
        },
        decrement: (state) => {
            // state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            // state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {changeBirthdayItem, deleteBirthdayItem, decrement, incrementByAmount} = birthdaySlice.actions

export default birthdaySlice.reducer