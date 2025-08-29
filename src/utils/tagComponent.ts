export function tagComponent(name: string) {
  return function <T>(component: T): T {
    // Optional: log component usage
    console.log(`Tagged component: ${name}`);
    return component;
  };
}
