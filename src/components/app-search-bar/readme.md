# app-search-bar



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute       | Description                                     | Type                                | Default            |
| ------------------- | --------------- | ----------------------------------------------- | ----------------------------------- | ------------------ |
| `auth` _(required)_ | `auth`          | Auth token for the URL                          | `string`                            | `undefined`        |
| `class`             | `class`         | Custom CSS class for styling                    | `string`                            | `''`               |
| `customStyles`      | `custom-styles` | Custom styles object for complete customization | `string \| { [key: string]: any; }` | `{}`               |
| `placeholder`       | `placeholder`   | Placeholder text for the search input           | `string`                            | `'Search apps...'` |


## Events

| Event         | Description                     | Type                            |
| ------------- | ------------------------------- | ------------------------------- |
| `appSelected` | Emitted when an app is selected | `CustomEvent<AppSelectedEvent>` |