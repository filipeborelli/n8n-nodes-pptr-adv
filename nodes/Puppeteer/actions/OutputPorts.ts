import { OutPutPorts } from "../utils/Cache";

export const AddOutputPort = (nodeInfos: any) =>{
    console.log(nodeInfos, "meuNode infos")
    OutPutPorts.push({
        type: "main",
        category: "error",
        displayName: "On browser close",
    });
}


export const RemoveOutputPort =  (nodeInfos: any) =>{
    console.log(nodeInfos, "meuNode infos")
}