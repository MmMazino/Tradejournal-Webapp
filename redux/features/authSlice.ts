import { createSlice , PayloadAction} from "@reduxjs/toolkit";



type InitialState = {
    value: AuthState;
}

type AuthState = {
    token:string;
    isAuth:boolean;
};

const initialState = {
    value:{
        token:'',
        isAuth:false,
    } as AuthState,
} as InitialState;

export const auth = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logOut:()=>{
            return initialState
        },
        logIn:(state,action)=>{
            return {
                value:{
                    token:action.payload,
                    isAuth:true,
                }
            };
        }
    },
});

export const { logIn , logOut} = auth.actions
export default auth.reducer;