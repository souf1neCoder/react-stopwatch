export const INITIAL_LAPS = {
    laps:[],
};

export const lapReducer = (state,action)=>{
    switch (action.type) {
        case 'add':
            return {
                laps:[...state.laps,action.payload]
            }
        case 'clear':
            return {
                laps:[]
            }  
        default:
            throw new Error("something went wrong");
    }
}