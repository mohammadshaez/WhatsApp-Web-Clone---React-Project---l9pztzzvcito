export const initialState = {
    user : null,
}

const reducer = (state, action) => {
    switch(action.type) {
        case "SET_USER" :
            return {
                ...state,
                user: action.user,
            }
        case "LOG_OUT" :
            return {
                ...state,
                user: null,
            }
        default :
            return state;
    }
}

export default reducer;