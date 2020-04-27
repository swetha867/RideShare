const INITIAL_STATE={
user:'',
password:'',
isLoggedIn:false,
loadingState:'init',
email:'',
isDriver:false,
isRider:false,
};

const userReducer =(state = INITIAL_STATE,action) =>{
    switch(action.type){
        case 'USER_SET_USER':
            return{
                ...state,
                user: action.user,
            };
            case 'USER_SET_EMAIL':
            return{
                ...state,
                email: action.email,
            };
            case 'USER_SET_PASSWORD':
            return{
                ...state,
                password: action.password,
            };
            case 'USER_SET_IS_LOGGED_IN':
            return{
                ...state,
                isLoggedIn: action.isLoggedIn,
            };
            case 'USER_SET_LOADING_STATE':
            return{
                ...state,
                loadingState: action.loadingState,
            };
            case 'USER_SET_IS_DRIVER':
            return{
                ...state,
                isDriver: action.isDriver,
            };
            case 'USER_SET_IS_RIDER':
            return{
                ...state,
                isRider: action.isRider,
            };
           
        default:
            return state;
    }
};
export default userReducer;