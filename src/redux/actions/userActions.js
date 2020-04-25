export const setUser=user =>({
    type: 'USER_SET_USER',
    user,
});
export const setPassword=password =>({
    type: 'USER_SET_PASSWORD',
    password,
});
export const setIsLoggedIn=isLoggedIn =>({
    type: 'USER_SET_IS_LOGGED_IN',
    isLoggedIn,
});
export const setLoadingState=loadingState =>({
    type: 'USER_SET_LOADING_STATE',
    loadingState,
});
export const setEmail=email =>({
    type: 'USER_SET_EMAIL',
    email,
});
export const saveNote=note =>({
    type: 'USER_SAVE_NOTE',
    note,
});
export const showNoteList=noteList =>({
    type: 'USER_SHOW_NOTE_LIST',
    noteList,
});

//setUser('Hello')-->{type: 'USER_SET_USER', user:hello}