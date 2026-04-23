export let classStore: any[] = [];

export function addClass(newClass: any) {
  classStore.push(newClass);
}

export function getClasses() {
  return classStore;
}

export function getClassByName(name: string) {
  return classStore.find(
    (c) => c.className === name
  );
}