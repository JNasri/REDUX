// this is the counter component that will be used in the applicatoin

// we first need to import some hooks from redux
import { useSelector, useDispatch } from "react-redux";

// then, we import the reducers we created in the slice of this component
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";
// we need the useState for the incrementByAmount reducer
import { useState } from "react";

const Counter = () => {
  // now we add the state to our component
  // 1) use useSelector
  const count = useSelector((state) => state.counter.count);
  // 2) create a dispatch
  const dispatch = useDispatch();

  // 3) update the JSX to have the needed logic

  // updating JSX require useState now becuase of incrementByAmount
  const [incrementAmount, setIncrementAmount] = useState(0);
  // if input field is number show it, else show 0 (prevent NaN)
  const addValue = Number(incrementAmount) || 0;
  // defin a function that reset state + useState values
  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };

  return (
    <section>
      <h1>{count}</h1>
      <div>
        <button onClick={() => dispatch(increment())}>ADD</button>
        <button onClick={() => dispatch(decrement())}>SUB</button>
      </div>
      <input
        type="text"
        value={incrementAmount}
        onChange={(e) => setIncrementAmount(e.target.value)}
      />

      <div>
        <button onClick={() => dispatch(incrementByAmount(addValue))}>
          add amount
        </button>
        <button onClick={resetAll}>RESET</button>
      </div>
    </section>
  );
};

export default Counter;
