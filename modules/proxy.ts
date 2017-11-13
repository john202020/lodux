
export function proxy(store) {

  const handler: any = {
    get: function (target, name: string): number | string | boolean {
      return name in target ? target[name] : target.state[name];
    },
    set: function (obj, prop: string, value: number | string | boolean) {

      if (typeof value === "function") {
        throw new TypeError('it is not intented for defining function');
      }

      obj.update({ ...obj.state, [prop]: value });

      // Indicate success
      return true;
    }
  };

  return new Proxy(store, handler);
}
