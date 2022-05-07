import { CombinedType, Deployment, Release } from "./model";

export function generateCombineList(
  deploymentList: Deployment[],
  releaseList: Release[]
) {
  const combinedList: CombinedType[] = [];
  for (const item of deploymentList) {
    const deploymentId = item.Id;
    const releasedId = item.ReleasedId;
    const environmentId = item.EnvironmentId;
    const projectId = releaseList.find(
      (item) => item.Id === releasedId
    )!.ProjectId;
    const deployedAt = item.DeployedAt;
    combinedList.push({
      deploymentId: deploymentId,
      releasedId: releasedId,
      environmentId: environmentId,
      projectId: projectId,
      deployedAt: deployedAt,
    });
  }

  return combinedList;
}

export function generateResultMap(combinedList: CombinedType[]) {
  // key will be 'projectId|releaseId|environmentId'
  const resultMap = new Map<string, string>();

  for (const item of combinedList) {
    const key = `${item.projectId}|${item.releasedId}|${item.environmentId}`;
    if (resultMap.get(key) === undefined) {
      resultMap.set(key, item.deployedAt);
    } else {
      const tempDeployedAtString = item.deployedAt;
      const currentDeployedAtString = resultMap.get(key)!;
      const tempDate = new Date(tempDeployedAtString);
      const currentDate = new Date(currentDeployedAtString);
      let resultDeployedAt =
        tempDate > currentDate ? tempDeployedAtString : currentDeployedAtString;
      resultMap.set(key, resultDeployedAt);
    }
  }

  return resultMap;
}

export function generateResultPrint(resultMap: Map<string, string>) {
  const resultArray: string[] = [];
  for (const item of resultMap) {
    const tempArr = item[0].split("|");
    resultArray.push(
      `'${tempArr[1]}' kept because it was the most recently deployed to '${tempArr[2]}'`
    );
  }
  return resultArray;
}
