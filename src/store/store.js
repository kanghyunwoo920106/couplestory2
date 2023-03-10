import { configureStore, createSlice } from "@reduxjs/toolkit";

let movie_data = createSlice({
  name: "movie_data",
  initialState: [
    {
      original_title: "",
      tagline: "",
      overview: "",
      homepage: "",
      poster_path: "",
      id: 0,
      production_companies: [{}],
      production_countries: [{}],
      genres: [{}],
      release_date: "",
      vote_count: 0,
      runtime: 0,
      revenue: 0,
      backdrop_path: "",
      adult: false,
      belongs_to_collection: "",
      budget: 0,
      imdb_id: 0,
      popularity: 0,
      spoken_languages: [{}],
      status: "",
      title: "",
      video: false,
      vote_average: 0,
      original_language: "",
    },
  ],
  reducers: {
    changeList(state) {},
  },
});

export default configureStore({
  reducer: {
    movie_data: movie_data.reducer,
  },
});

// let cart = createSlice({
//     name : 'cart',
//     initialState : [
//       {id : 0, name : 'White and Black', count : 2},
//       {id : 1, name : 'Grey Yordan', count : 1}
//     ],
//     reducers: {
//         changeCount(state, i) {
//             let b = state.findIndex((a) => {
//               return a.id == i.payload
//             })
//             state[b].count++
//         },
//         addItem(state,action) {
//           state.push(action.payload)
//         }
//     }
//   })

//   export let {changeCount, addItem} = cart.actions
//   export let {changeName ,increase} = user.actions

//   export default configureStore({
//     reducer: {
//       cart : cart.reducer
//     }
//   })
