import { Deployment, Release } from "./model";
import {
  generateCombineList,
  generateResultMap,
  generateResultPrint,
} from "./util";
import deploymentData from "./data_files/Deployments.json";
import releasesData from "./data_files/Releases.json";

export function executer() {
  const deploymentList = deploymentData as Deployment[]
  const releaseList = releasesData as Release[];
  const combinedList = generateCombineList(deploymentList, releaseList);
  const resultMap = generateResultMap(combinedList);
  const printArray = generateResultPrint(resultMap);

  for (const item of printArray) {
    console.log(item);
  }
}

executer();
