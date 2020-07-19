# ble-scan



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                    | Default     |
| --------- | --------- | ----------- | ----------------------- | ----------- |
| `service` | `service` |             | `BluetoothGATTServices` | `undefined` |


## Events

| Event     | Description | Type                                   |
| --------- | ----------- | -------------------------------------- |
| `error`   |             | `CustomEvent<Error>`                   |
| `success` |             | `CustomEvent<BluetoothGATTPeripheral>` |


## Dependencies

### Depends on

- ion-button
- [connection-spinner](ble-connection-spinner)
- ion-list
- ion-list-header
- ion-label
- ion-item
- ion-icon

### Graph
```mermaid
graph TD;
  ble-scan --> ion-button
  ble-scan --> connection-spinner
  ble-scan --> ion-list
  ble-scan --> ion-list-header
  ble-scan --> ion-label
  ble-scan --> ion-item
  ble-scan --> ion-icon
  ion-button --> ion-ripple-effect
  connection-spinner --> ion-icon
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  style ble-scan fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
