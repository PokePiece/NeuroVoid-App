export function useCpp(wasmUrl: string, options: { exports: string[] }) {
  async function loadWasm() {
    const wasmModule = await WebAssembly.instantiateStreaming(fetch(wasmUrl));
    const instance = wasmModule.instance;

    const call = (fnName: string, ...args: number[]) => {
      if (!options.exports.includes(fnName)) {
        throw new Error(`Function '${fnName}' not exported in WASM.`);
      }
      return (instance.exports as any)[fnName](...args);
    };

    return { call };
  }

  return { loadWasm };
}
