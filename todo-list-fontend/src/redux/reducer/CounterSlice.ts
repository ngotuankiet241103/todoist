import { createSlice } from "@reduxjs/toolkit"
type counter = {
    value: number
}
const initialValue : counter = {
    value: 1
}
const counterSlice = createSlice({
    name: 'counter',
    initialState: initialValue,
    reducers: {
      incremented: state => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.value += 1
      },
      decremented: state => {
        state.value -= 1
      }
    }
}
)
export const { incremented, decremented } = counterSlice.actions
export default counterSlice.reducer