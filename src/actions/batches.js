import {  BATCHES } from "./types";

export const setBatches = (totalBatch) => ({
  type: BATCHES,
  payload: totalBatch,
});

// export const clearMessage = () => ({
//   type: CLEAR_MESSAGE,
// });