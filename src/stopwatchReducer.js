export const STOPWATCH_INITIAL = {
  isRunning: false,
  time: {
    milliseconds: 0,
    seconds: 0,
    minutes: 0,
  },
};

export const stopwatchReducer = (state, action) => {
    let timeRes;
  switch (action.type) {
    case "start":
      return { ...state, isRunning: true };
    case "stop":
      return { ...state, isRunning: false };
    case "reset":
      return {
        isRunning: false,
        time: {
          milliseconds: 0,
          seconds: 0,
          minutes: 0,
        },
      };
    case "tick":
      // eslint-disable-next-line no-case-declarations
      timeRes = STOPWATCH_INITIAL.time;
      if (state.time.milliseconds == 99) {
        timeRes.milliseconds = 0;
        if(state.time.seconds == 59){
            timeRes.seconds=0
            timeRes.minutes=state.time.minutes + 1
        }else{
            timeRes.seconds = state.time.seconds + 1;
        }
      } else {
        timeRes.milliseconds = state.time.milliseconds+ 1;
      }
      console.log(timeRes,state.time);
      return {...state,time:timeRes}
    default:
      throw new Error("something went wrong");
  }
};
