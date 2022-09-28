import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import APIurl from '../APIBack'

const citiesAPI = createApi({
  reducerPath: "citiesAPI",

  baseQuery: fetchBaseQuery({
    baseUrl: `${APIurl}`,
  }),
  ////////////////////////////////////////Get methods//////////////////////////////////////////////////


  endpoints: (builder) => ({/////////////////cieties//////////////////////////////////////////////
    getAllCities: builder.query({ query: (params) => `/cities/${params}` }),



    ///////////////////////////////////////////itineraries//////////////////////////////////////////
    GetIdItineraries: builder.query({ query: (id) => `/itineraries/city/${id}` }),



    GetItinerariesUser: builder.query({ query: (user) => `/itineraries/user/${user}` }),


    ///////////////////////////post Methods user/////////////////////////////////
    AddUserSignUp: builder.mutation({
      query: (payload) => ({
        url: '/auth/signup',
        method: 'POST',
        body: payload,
      }),
    }),

    AddUserSignIn: builder.mutation({
      query: (payload) => ({
        url: '/auth/signin',
        method: 'POST',
        body: payload,
      }),
    }),

    signInToken: builder.mutation({
      query: (token) => ({
        url: '/auth/token',
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token }
      })
    }),

    AddUserSignOut: builder.mutation({
      query: (payload) => ({
        url: '/auth/signout',
        method: 'POST',
        body: payload,
      }),
    }),
    /////////////////////////////////////////////////////itineraries
    CreateItinerary: builder.mutation({
      query: (payload) => ({
        url: '/itineraries',
        method: 'POST',
        body: payload,
      }),
    }),

    EditItinerary: builder.mutation({
      query: (payload) => ({
        url: `/itineraries/${payload.id}`,
        method: 'PATCH',
        body: payload,
      }),
    }),
    
    RemoveItinerary: builder.mutation({
      query: (payload) => ({
        url: `/itineraries/${payload}`,
        method: 'DELETE',
      }),
    }),
    ///////////////////////////////////////////////like
    AddLike: builder.mutation({
      query: (payload) => ({
        url: `/itineraries/like/${payload}`,
        method: 'PATCH',
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") }
      }),
    }),
    ///////////////////////////////////////////////comment
    EditComment: builder.mutation({
      query: (payload) => ({
        url: `comments/${payload.id}`,
        method: 'PATCH',
        body: payload,
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") }
      }),
    }),

    RemoveComment: builder.mutation({
      query: (payload) => ({
        url: `/comments/${payload}`,
        method: 'DELETE',
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") }
      }),
    }),

    CreateComment: builder.mutation({
      query: (payload) => ({
        url: '/comments',
        method: 'POST',
        body: payload,
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") }
      }),
    }),

  }),

})


export default citiesAPI
export const {
  useGetAllCitiesQuery,
  useRemoveItineraryMutation,
  useGetIdItinerariesQuery,
  useEditItineraryMutation,
  useCreateItineraryMutation,
  useGetItinerariesUserQuery,
  useAddUserSignInMutation,
  useAddUserSignOutMutation,
  useAddUserSignUpMutation,
  useSignInTokenMutation,
  useAddLikeMutation,
  useEditCommentMutation,
  useRemoveCommentMutation,
  useCreateCommentMutation,
} = citiesAPI