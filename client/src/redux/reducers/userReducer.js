const INITIAL_STATE={
user:'',
password:'',
isLoggedIn:false,
loadingState:'init',
email:'',
note: '',
noteList: ''
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
            }
            case 'USER_SAVE_NOTE':
            return{
                ...state,
                loadingState: action.note,

            }
            case 'USER_SHOW_NOTE_LIST':
            return{
                ...state,
                loadingState: action.noteList,
            }
        default:
            return state;
    }
};
export default userReducer;