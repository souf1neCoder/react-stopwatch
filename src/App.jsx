/* eslint-disable no-unused-vars */
import { useEffect, useReducer, useRef } from 'react'
import { STOPWATCH_INITIAL, stopwatchReducer } from './stopwatchReducer'
import { INITIAL_LAPS, lapReducer } from './lapReducer';

function App() {
  const [stateSw, dispatchSw] = useReducer(stopwatchReducer,STOPWATCH_INITIAL);
  const [stateLap, dispatchLap] = useReducer(lapReducer,INITIAL_LAPS);
  const idRef = useRef(0);
  const stateSwTimeSnapshot = {...stateSw.time}
  const handleZeroBefore = (value)=>{
    return value < 10 ? '0' + value : value
  }
  useEffect(()=>{
    if(!stateSw.isRunning){
      return
    }
    idRef.current = setInterval(()=>dispatchSw({type:'tick'}),10)
    return ()=>{
      clearInterval(idRef.current)
      idRef.current = 0;
    }
  },[stateSw.isRunning])

  return (
    <>
      <div className="container">
        <div className="stopwatch_wrapper">
          <h1 className='head_title'>Stop<span>Watch</span></h1>
          <div className="circle" style={{
            borderColor: `${
              stateSw.isRunning ? '#ff0000' : '#fff'
            }`
          }}>{handleZeroBefore(stateSw.time.minutes)} : {handleZeroBefore(stateSw.time.seconds)} : <small>{handleZeroBefore(stateSw.time.milliseconds)}</small></div>
          <div className="controls_btn">
              <div className="circle_btn">
              <button onClick={()=>dispatchSw({type:'reset'})}>Reset</button>
              </div>
              <div className="circle_btn">
              {
                !stateSw.isRunning ? <button onClick={()=>dispatchSw({type:'start'})}>Play</button> : <button onClick={()=>dispatchSw({type:'stop'})}>Pause</button>
              }
              </div>
              <div className="circle_btn">

              <button onClick={()=>dispatchLap({type:'add',payload:stateSwTimeSnapshot})}>Lap</button></div>
          </div>
          {stateLap.laps.length > 0 && <div className="list_items">
            <ul>
              {
               stateLap.laps.map((lap,i)=><li key={i}>#{i+1} {handleZeroBefore(lap.minutes)} {handleZeroBefore(lap.seconds)} {handleZeroBefore(lap.milliseconds)}</li>)
              }
            </ul>
          <div className="clear_all">
            <button onClick={()=>dispatchLap({type:'clear'})}>Clear All</button>
          </div>
          </div>}
        </div>
      </div>
    </>
  )
}

export default App
