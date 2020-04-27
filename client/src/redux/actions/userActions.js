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
export const setIsDriver=isDriver =>({
    type: 'USER_SET_IS_DRIVER',
    isDriver,
});
export const setIsRider=isRider =>({
    type: 'USER_SET_IS_RIDER',
    isRider,
});




//setUser('Hello')-->{type: 'USER_SET_USER', user:hello}