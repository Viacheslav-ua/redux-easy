import { configureStore } from "@reduxjs/toolkit";
import { useEffect, useReducer } from "react";


type CounterState = {
  counter: number;
};

type CounterId = string;

type State = {
  counters: Record<CounterId, CounterState | undefined>
}

export type IncrementAction = {
  type: "increment";
  payload: {
    counterId: CounterId;
  }
};

export type DecrementAction = {
  type: "decrement";
  payload: {
    counterId: CounterId;
  }
};

type Action = IncrementAction | DecrementAction;

const initialCounterState: CounterState = { counter: 0 };
const initialState: State = {
  counters: {}
}

const reducer = (state = initialState, action: Action): State => {

  switch (action.type) {
    case "increment": {
      const { counterId } = action.payload;
      const currentCounter = state.counters[counterId] || initialCounterState;
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter + 1,
          },
        },
      };
    }
    case "decrement": {
      const { counterId } = action.payload;
      const currentCounter = state.counters[counterId] || initialCounterState;
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter - 1,
          },
        },
      };
    }
    default:
      return state
  }
};

export function Counter({ counterId }: { counterId: CounterId }) {

  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate()
    });

    return unsubscribe;
  }, []);

  return (
    <>
      counter {store.getState().counters[counterId]?.counter}
      <button onClick={() => store.dispatch({ type: 'increment', payload: { counterId } } satisfies IncrementAction)}>
        Increment
      </button>
      <button onClick={() => store.dispatch({ type: 'decrement', payload: { counterId } } satisfies DecrementAction)}>
        Decrement
      </button>
    </>
  )
}
export const store = configureStore({
  reducer: reducer,
});
