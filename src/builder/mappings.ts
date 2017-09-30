const getMappings = ({ types, abiFunc, config }, inout: string) => {
    const configInOut = (inout === 'input') 
    ? config.inputMappings 
    : config.outputMappings
    const abiFuncInOut = (inout === 'input')
    ? abiFunc.inputs
    : abiFunc.outputs

    const mappedFunctions = abiFuncInOut.reduce((str, curr, idx) => {
        types.mapType(curr.type);
        const name =
          (configInOut &&
            configInOut[abiFunc.name] &&
            configInOut[abiFunc.name][idx]) ||
          curr.name ||
          `${curr.type}_${idx}`;
        return (str += `${name}: ${curr.type}${idx === abiFuncInOut.length - 1
          ? ''
          : ', '}`);
      }, '');
    return mappedFunctions;
}


export const getOutputs = ({ types, abiFunc, config }) => {
  return getMappings({ types, abiFunc, config }, 'output');
}

export const getInputs = ({ types, abiFunc, config }) => {
    return getMappings({ types, abiFunc, config }, 'input');
}
