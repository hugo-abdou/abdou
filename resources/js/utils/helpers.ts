export function loadModules(context) {
    const files: string[] = [];
    const modules = Object.keys(context)
        .map((key) => ({ key, name: key.match(/([a-z_]+)\.ts$/i)![1] }))
        .reduce((modules, { key, name }) => {
            if (context[key]?.default) {
                modules[name] = context[key]?.default
            }
            return modules
        }, {})
    return { modules, files }
}