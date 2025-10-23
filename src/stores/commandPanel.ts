import { reactive, watch } from "vue";
const user= localStorage.getItem('user')
type LogEntry = {
  datetime?: string;
  message?: string;
  [key: string]: unknown;
};
//Guardar registro en localstorage
const saved = sessionStorage.getItem("commandLogs");

/**
 * Original 
const state = reactive<{ logs: LogEntry[] }>({
  logs: [] as LogEntry[],
});
*/
const state = reactive({
  logs: saved ? JSON.parse(saved) : [],
});
watch(
  () => state.logs,
  (val) => sessionStorage.setItem("commandLogs", JSON.stringify(val)),
  { deep: true }
);

export function useCommandPanel() {
  const add = (entry: LogEntry) => {
    if (!entry.datetime) {
      entry.datetime = new Date().toLocaleString(); // autogenera fecha
    }
    entry.user = user;

    // Inserta al inicio (más reciente primero)
    state.logs.unshift(entry);
  };

  const clear = () => {
    state.logs = [];
  };

  const getAll = () => state.logs;

  return {
    state,
    add,
    clear,
    getAll,
  };
}
