export function usePython(pyodideUrl = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js") {
  async function loadPyodideAndRun(script: string) {
    if (!(window as any).loadPyodide) {
      await import(pyodideUrl);
    }
    const pyodide = await (window as any).loadPyodide();
    return await pyodide.runPythonAsync(script);
  }

  return {
    run: loadPyodideAndRun,
  };
}
