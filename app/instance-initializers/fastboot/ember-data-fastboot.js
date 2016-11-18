export function initialize(applicationInstance) {
  let store = applicationInstance.lookup('service:store');
  let shoebox = applicationInstance.lookup('service:fastboot').get('shoebox');

  shoebox.put('ember-data-store', {
    get records() {
      return Object.keys(store.typeMaps)
        .map(key => {
          let modelName = store.typeMaps[key].type.modelName;
          return {
            modelName: modelName,
            data: store.peekAll(modelName)
                      .toArray()
                      .map(record => record.serialize({ includeId: true }) )
          };
        })
        .reduce((a, current) => {
          a[current.modelName] = current.data;
          return a;
        }, {});
    }
  });
}

export default {
  name: 'ember-data-fastboot',
  initialize
};
