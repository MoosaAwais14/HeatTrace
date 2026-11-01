# HeatTrace README

Visualizes CPU profiling data as a heatmap directly in your source code.

> **Status:** HeatTrace is under active early development. The features below describe the planned v1 and are not all implemented yet.

## Features

HeatTrace reads a V8 `.cpuprofile` file and maps the slowest parts of your program onto the source files in your editor, so you can see bottlenecks where you write code instead of digging through a profiler UI.

- **In-editor heatmap:** Lines are shaded by how much CPU time they used, from transparent/blue for cold lines to orange/red for hot ones.
- **Gutter flame icons:** The hottest lines get a flame icon in the gutter so they stand out at a glance.
- **Hover details:** Hover over a hot line to see its timing, for example `Execution Time: 480ms (42% of file self-time)`.
- **Explorer badges:** Files in the File Explorer are marked with a flame icon and a CPU percentage badge, so you can find hot files without opening them.
- **Self time and total time:** Each line is measured two ways. Self time is time spent executing that exact line. Total time also includes everything that line calls.
- **Auto-detection:** If a `.cpuprofile` is created or dropped into your workspace, HeatTrace offers to apply the heatmap.

<!-- Add screenshots or a short GIF here once the first version works, e.g.
![HeatTrace heatmap in the editor](images/heatmap.png)
-->

### Quick start

1. Generate a profile by running your app with the Node profiler:

   ```bash
   node --cpu-prof server.js
   ```

   This writes a `.cpuprofile` file when the process exits.

2. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and run **HeatTrace: Load Profile**.
3. Pick your `.cpuprofile` (or `.json`) file.
4. Open any profiled source file to see the heatmap.

### How it works

A `.cpuprofile` is a log of periodic snapshots. At each snapshot, the profiler records which function was running. HeatTrace adds up the time attributed to each function, merges results by file and line, and paints them onto your code. Because this is a sampling profiler, very fast code may not appear in the results, and times are estimates rather than exact measurements.

## Requirements

- Visual Studio Code 1.80 or newer (the exact minimum will be confirmed before release).
- A `.cpuprofile` file in V8 format. These can be produced by:
  - Node.js: `node --cpu-prof your-script.js`
  - Chrome DevTools: Performance panel, then export the profile
- Your source files must be open in the workspace. HeatTrace matches the file paths in the profile to files in your workspace folders.

## Extension Settings

HeatTrace does not contribute any settings yet. This section will be updated as settings are added.

This extension contributes the following commands:

- `heattrace.loadProfile`: Pick a `.cpuprofile` or `.json` file from disk and apply the heatmap.

## Known Issues

- **Transpiled or bundled code is not supported yet.** If you profile compiled output (TypeScript, webpack, etc.), line numbers will refer to the compiled file rather than your original source. Source map support is planned for a later release.
- **Very fast lines may be missing.** The profiler takes snapshots on a timer, so code that runs for less than one sampling interval can be skipped.
- **Profile paths must match your workspace.** Profiles recorded on another machine, or in a container, may reference paths that don't exist locally.
- **V8 internal entries are ignored.** Entries like `(root)`, `(program)`, and `(garbage collector)` are not real source lines, so they are filtered out.

If you hit something not listed here, please open an issue.

## Release Notes

### 0.0.1

Initial development version. Project scaffold and `.cpuprofile` parser (self time and total time per line).

---

## Contributing

HeatTrace is open source and contributions are welcome once the repository is public.

```bash
git clone <repository-url>
cd heattrace
npm install
```

Open the folder in VS Code and press `F5` to launch an Extension Development Host with HeatTrace loaded.

## Following extension guidelines

This extension aims to follow the VS Code extension best practices.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## For more information

* [VS Code Extension API](https://code.visualstudio.com/api)
* [V8 CPU Profiler](https://v8.dev/docs/profile)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)
