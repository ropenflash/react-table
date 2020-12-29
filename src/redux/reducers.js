
const initialState={
    rows : [
      {
        id: 25,
        name: "user1",
        phoneNumber: "1234567890",
        email: "user1@gmail.com",
        gender: "male",
        locations: "Bangalore,Delhi",
      },
      {
        id: 26,
        name: "user2",
        phoneNumber: "2222222222",
        email: "user2@gmail.com",
        gender: "female",
        locations: "Bangalore,Delhi,Mumbai",
      },
    ],
    columns : [
      { id: 1, title: "Name", span:1 },
      { id: 2, title: "Phone Number", span:1 },
      { id: 3, title: "Email Id", span:1 },
      { id: 4, title: "Gender", span:1 },
      { id: 5, title: "Locations", span:1 },
      {id:6, title:"Actions", span:2}
    ]
  }

const rowManipulation=(state=initialState,action)=>{
    switch(action.type){
        case "ADD": return {...state, rows:[...state.rows,action.payload]}
        case "EDIT": return {...state,rows:state.rows.map(row=>{
          if(row.id===action.payload.id){
              return action.payload
          }
          return row
        })}
        case "DELETE": return {...state, rows:state.rows.filter(row=>row.id!==action.payload)}
        default: return state
    }
}


export default rowManipulation