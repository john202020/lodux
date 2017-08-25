# Single store management for react component.
Connects [`lodux`]( https://www.npmjs.com/package/lodux) store and [`vuejs`](https://vuejs.org/) component.


### Example (/src/components/Hello.vue)
```javascript
<template>
  <div class="hello">
    <p>
      <strong>text box manipulation</strong><br/>
      <button v-on:click="add(10)">add 10</button>
      <input type="number" v-model.number.trim="count" v-on:input="count = parseInt($event.target.value)">
      <button v-on:click="minus(10)">minus 10</button>
    </p>

    <p>
      <strong>selection one item</strong><br/>
      <select v-model="people.selected">
        <option disabled value="">Please select one</option>
        <option v-for="person in people.names" v-bind:value="person.name">
          {{ person.text }}
        </option>
      </select>
      <br/>
      <span>selected: {{ people.selected }}</span>
    </p>

    <p>
      <strong>selection multiple items</strong><br/>
      <select v-model="people.selectes" multiple>
        <option v-for="person in people.names" v-bind:value="person.name">
          {{ person.text }}
        </option>
      </select>
      <br/>
      <span>selected: {{ people.selectes }}</span>
    </p>

    <p>
      <strong>text manipulation</strong><br/>
      <textarea v-model="message" placeholder="add multiple lines"></textarea>
      <br/> {{message}}
    </p>

    <p>
      <strong>check box</strong><br/>
      <input type="checkbox" id="checkbox" v-model="checked">
      <label for="checkbox">{{ checked }}</label>
    </p>

    <p>
      <strong>multiple checkboxes</strong><br/>
      <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
      <label for="jack">Jack</label>
      <input type="checkbox" id="john" value="John" v-model="checkedNames">
      <label for="john">John</label>
      <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
      <label for="mike">Mike</label>
      <br>
      <span>checked names: {{ checkedNames }}</span>
    </p>

    <p>
      <strong>multiple radio</strong><br/>
      <input type="radio" id="one" value="One" v-model="picked">
      <label for="one">One</label>
      <input type="radio" id="two" value="Two" v-model="picked">
      <label for="two">Two</label>
      <br>
      <span>picked: {{ picked }}</span>
    </p>

  </div>
</template>

<script>
import { Store, connect } from 'vue-lodux';

Store.config({ isHMR: true });

const el = {
  name: 'hello'
}

export default el;

const initial = {
  checked: false,
  picked: [],
  checkedNames: [],
  message: '',
  count: 0,
  people: {
    selectes: [],
    selected: '',
    names: [
      { name: 'Peter', text: 'this is Peter' },
      { name: 'Mary', text: 'this is Mary' }
    ]
  }
};

const action_creator = store => {

  store.reduce('add', action => {
    return { ...store.state, count: store.state.count + action.amount };
  });
  store.reduce('minus', action => {
    return { ...store.state, count: store.state.count - action.amount };
  });

  //dispatchers
  return {
    add: amount => {
      store.dispatch({ type: 'add', amount });
    },
    minus: amount => {
      store.dispatch({ type: 'minus', amount });
    }
  };
};

const store = connect(el, action_creator, initial);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  padding: 0 1rem 1rem 1rem;
}

p {
  padding: 1rem;
  border: 1px solid #f9f9f9;
  background-color: #f9f9f9;
  border-radius: 0.4rem;
}

input[type=number] {
  width: 5rem;
  text-align: center;
}
</style>
```

## testing with HMR
[`vuejs`](https://vuejs.org/) development mode has modular refresh.  

Using `lodux/vue`, you might find the whole page being reloaded rather than modular refresh. To fixed modular refresh, set the Store configuration to recognize HMR before doing any binding.
```javascript
Store.config({ isHMR: true });
```

## Download from script tag
&lt;script src="where /dist/lodux.js is located">&lt;/script>
```javascript
//if in conflict
var lodux = lodux.noConflict();

var vue = lodux.vue;
var Store = lodux.vue.Store;
var connect = lodux.vue.connect;
```