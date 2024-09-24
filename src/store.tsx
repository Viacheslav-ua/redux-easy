import { configureStore } from "@reduxjs/toolkit";
import { useEffect, useReducer, useRef } from "react";


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

const selectCounter = (state: AppState, counterId: CounterId) => state.counters[counterId];

export function Counter({ counterId }: { counterId: CounterId }) {
  console.log('render counter', counterId);

  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  const previousStateRef = useRef<ReturnType<typeof selectCounter>>();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const currentState = selectCounter(store.getState(), counterId);
      const previousState = previousStateRef.current;

      if(currentState?.counter !== previousState?.counter) {
        forceUpdate()
      }
      previousStateRef.current = currentState; 
    });

    return unsubscribe;
  }, []);

  const CounterState = selectCounter(store.getState(), counterId);

  return (
    <>
      counter {CounterState?.counter}
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

export type AppState = ReturnType<typeof store.getState>;
