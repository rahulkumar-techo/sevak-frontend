import { apiSlice } from "../apis/apiSlice";
import { setUser, userLoggedIn, userRegistration } from "./authSlice";

// Types
interface RegistrationResponse {
  user: any; // Ideally use your User type/interface
}

interface RegistrationData {
  fullName: string;
  email: string;
  password: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ------------------- REGISTER -------------------
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
        credentials: "include", // always include cookies for cross-origin
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.user) {
            dispatch(userRegistration({ user: data.user }));
          }
        } catch (error) {
          console.error("Registration failed:", error);
        }
      },
    }),

    // ------------------- EMAIL VERIFICATION -------------------
    emailVerification: builder.mutation<any, { otp: string; userId: string }>({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // ------------------- LOGIN -------------------
    userLoginApi: builder.mutation<any, { email: string; password: string }>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.user) {
            dispatch(userLoggedIn({ user: data.user }));
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),

    // ------------------- GET MY PROFILE -------------------
    myProfile: builder.query<any, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["UserProfile"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            console.log({roles:data?.data?.roles[0] })
            dispatch(setUser({ user: data.data,roles:data?.data?.roles }));
          }
        } catch (error) {
          console.error("Fetching profile failed:", error);
        }
      },
    }),

    // ------------------- LOGOUT -------------------
    logOut: builder.mutation<any, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["UserProfile"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(setUser({ user: null }));
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),
    // ------------------- FORGOT PASSWORD -------------------

     forgot_password: builder.mutation<any, {email:string}>({
      query: ({email}) => ({
        url: "/auth/forgot-password",
        method: "POST",
        credentials: "include",
        body:{email}
      }),
      invalidatesTags: ["UserProfile"],
    }),
    // ------------------- FORGOT PASSWORD -------------------

     reset_password: builder.mutation<any, {otp:string, password:string, resetToken:string}>({
      query: ({otp,password,resetToken}) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        credentials: "include",
        body:{otp,password,resetToken}
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
});

// Export hooks
export const {
  useRegisterMutation,
  useEmailVerificationMutation,
  useUserLoginApiMutation,
  useMyProfileQuery,
  useLogOutMutation,
  useForgot_passwordMutation,
  useReset_passwordMutation
} = authApi;
