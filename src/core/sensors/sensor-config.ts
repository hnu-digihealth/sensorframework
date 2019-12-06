export interface SensorConfig {

  name: string;

  actions: {
    pull?: boolean,
    push?: boolean,
    watch?: boolean,
    stream?: boolean
  };
}

const SensorDefaultConfig: SensorConfig = {
  name: "Unknown Sensor",
  actions: {
    pull: false,
    push: false,
    watch: false,
    stream: false
  }
};

export const mergeConfig = (config: SensorConfig): SensorConfig => {

  const { name, actions } = config;

  return {
    name,
    actions : {
      push: actions.push ? actions.push : SensorDefaultConfig.actions.push,
      pull: actions.pull ? actions.pull : SensorDefaultConfig.actions.pull,
      watch: actions.watch ? actions.watch : SensorDefaultConfig.actions.watch,
      stream: actions.stream ? actions.stream : SensorDefaultConfig.actions.stream
    }
  };


};
