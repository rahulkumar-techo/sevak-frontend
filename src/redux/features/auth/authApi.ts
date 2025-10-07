import { apiSlice } from "../apis/apiSlice";
import { setUser, userLoggedIn, userRegistration } from "./authSlice";

// Define types
interface RegistrationResponse {
  user: any;       // Ideally match your User interface
}

interface RegistrationData {
  fullName: string;
  email: string;
  password: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     if (data?.user) {
      //       // Dispatch to update authSlice
      //       dispatch(userRegistration({ user: data.user }));
      //     }
      //   } catch (error) {
      //     console.error("Registration failed:", error);
      //   }
      // },
    })
    ,
    emailVerification: builder.mutation<any, { otp: string, userId: string }>({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),
    // added login
    userLoginApi: builder.mutation<any, { email: string, password: string }>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data
      })
      ,
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.user) {
            //       // Dispatch to update authSlice
            dispatch(userLoggedIn({ user: data.user }));
          }
        } catch (error) {
          console.error("Registration failed:", error);
        }
      }
    }
    ),
    myProfile:builder.query<any,void>({
      query:()=>({
        url:"/auth/me",
        method:"GET",
        credentials:"include"
      })
      , async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data)
          if (data?.data) {
            //       // Dispatch to update authSlice
            dispatch(setUser({ user: data?.data }));
          }
        } catch (error) {
          console.error("Registration failed:", error);
        }
      }
    })
  }),
});

export const { useRegisterMutation,useEmailVerificationMutation,useUserLoginApiMutation ,useMyProfileQuery} = authApi;
