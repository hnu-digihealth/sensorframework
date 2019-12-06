# connection-spinner



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type                                     | Default     |
| ----------- | ----------- | ----------- | ---------------------------------------- | ----------- |
| `direction` | `direction` |             | `"bottom" \| "left" \| "right" \| "top"` | `"right"`   |
| `label`     | `label`     |             | `string`                                 | `undefined` |


## Dependencies

### Used by

 - [ble-blood-pressure](..\..\blood-pressure)
 - [ble-body-composition](..\..\body-composition)
 - [ble-connector](..)
 - [ble-heart-rate](..\..\heart-rate)
 - [ble-pulse-oximeter](..\..\pulse-oximeter)
 - [ble-temperature](..\..\temperature)
 - [ble-weight-scale](..\..\weight-scale)

### Depends on

- ion-icon

### Graph
```mermaid
graph TD;
  connection-spinner --> ion-icon
  ble-blood-pressure --> connection-spinner
  ble-body-composition --> connection-spinner
  ble-connector --> connection-spinner
  ble-heart-rate --> connection-spinner
  ble-pulse-oximeter --> connection-spinner
  ble-temperature --> connection-spinner
  ble-weight-scale --> connection-spinner
  style connection-spinner fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
