import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const userSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		// Give case reducers meaningful past-tense "event"-style names
		logEverything(state, action) {
			console.log(state, action)
		},
	}
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { logEverything } = userSlice.actions

// Export the slice reducer as the default export
export default userSlice.reducer
