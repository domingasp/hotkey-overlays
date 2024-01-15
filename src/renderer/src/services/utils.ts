import { Dispatch, SetStateAction } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
async function fetchAndSetState<T>(
  result: Promise<T>,
  setState: Dispatch<SetStateAction<T>>
) {
  const res = await result;
  setState(res);
}

export default fetchAndSetState;
