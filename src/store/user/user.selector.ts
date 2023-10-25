import { createSelector } from "reselect";
import { UserState } from "./user.reducer";

export const selectUserReducer = (state: { user: UserState }): UserState =>
	state.user;

export const selectCurrentUser = createSelector(
	selectUserReducer,
	(user) => user.currentUser
);
