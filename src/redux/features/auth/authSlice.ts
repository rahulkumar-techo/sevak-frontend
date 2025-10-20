import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: {
        _id?: string;
        fullName?: string;
        email?: string;
        isVerified?: boolean;
        isActive?: boolean;
        roles?: string[];
        avatar?: any;
    } | null;
    isAuthenticated: boolean;
    roles: string[]
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    roles: []
};

interface AuthPayload {
    user?: AuthState["user"];
    roles?: string[]
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action: PayloadAction<AuthPayload>) => {
            if (action.payload.user) {
                state.user = { ...(state.user || {}), ...action.payload.user };
                state.isAuthenticated = false;
            }
        },
        setUser: (state, action: PayloadAction<AuthPayload>) => {
            if (action.payload.user) {
                state.user = { ...(state.user || {}), ...action.payload.user };
                if (action?.payload?.roles)
                    state.roles = action?.payload?.roles
                state.isAuthenticated = !!action.payload.user;
            }
        },
        userLoggedIn: (state, action: PayloadAction<AuthPayload>) => {
            if (action.payload.user) {
                state.user = { ...(state.user || {}), ...action.payload.user };
                state.isAuthenticated = true;
            }
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { userRegistration, userLoggedIn, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
