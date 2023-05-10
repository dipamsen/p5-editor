import { action } from "easy-peasy";
export const createConsoleLog = action((state, log) => {
    state.consoleLogs.push(log);
});
