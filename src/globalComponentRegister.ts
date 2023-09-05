export default async function globalComponentRegister(app: any) {
  const components = import.meta.glob('./components/*.vue')

  for (const path in components) {
    if (!path.match(/Base[A-Z]\w+\.(vue|js|ts)$/)) return

    const componentName = components[path].name
      .split('/')
      .pop()
      ?.replace(/\.\w+$/, '') as string

    const component = await import(`./components/${componentName}.vue`)

    app.component(componentName, component.default || component)
  }
}
