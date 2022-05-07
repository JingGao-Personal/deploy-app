import { CombinedType, Deployment, Release } from "./model";
import {
  generateCombineList,
  generateResultMap,
  generateResultPrint,
} from "./util";

describe("util functions", () => {
  it("---- generate combined list should work correctly", () => {
    const mockDeployList: Deployment[] = [
      { Id: "1", ReleasedId: "1", EnvironmentId: "1", DeployedAt: "1" },
      { Id: "2", ReleasedId: "1", EnvironmentId: "2", DeployedAt: "2" },
      { Id: "3", ReleasedId: "2", EnvironmentId: "1", DeployedAt: "3" },
      { Id: "4", ReleasedId: "2", EnvironmentId: "2", DeployedAt: "4" },
      { Id: "5", ReleasedId: "3", EnvironmentId: "1", DeployedAt: "5" },
      { Id: "6", ReleasedId: "3", EnvironmentId: "2", DeployedAt: "6" },
      { Id: "7", ReleasedId: "4", EnvironmentId: "1", DeployedAt: "7" },
      { Id: "8", ReleasedId: "4", EnvironmentId: "2", DeployedAt: "8" },
    ];

    const mockReleaseList: Release[] = [
      { Id: "1", ProjectId: "1", Version: "bla", CreatedAt: "1" },
      { Id: "2", ProjectId: "1", Version: "bla", CreatedAt: "2" },
      { Id: "3", ProjectId: "2", Version: "bla", CreatedAt: "3" },
      { Id: "4", ProjectId: "2", Version: "bla", CreatedAt: "4" },
    ];

    const expectCombineList: CombinedType[] = [
      {
        deploymentId: "1",
        releasedId: "1",
        environmentId: "1",
        projectId: "1",
        deployedAt: "1",
      },
      {
        deploymentId: "2",
        releasedId: "1",
        environmentId: "2",
        projectId: "1",
        deployedAt: "2",
      },
      {
        deploymentId: "3",
        releasedId: "2",
        environmentId: "1",
        projectId: "1",
        deployedAt: "3",
      },
      {
        deploymentId: "4",
        releasedId: "2",
        environmentId: "2",
        projectId: "1",
        deployedAt: "4",
      },
      {
        deploymentId: "5",
        releasedId: "3",
        environmentId: "1",
        projectId: "2",
        deployedAt: "5",
      },
      {
        deploymentId: "6",
        releasedId: "3",
        environmentId: "2",
        projectId: "2",
        deployedAt: "6",
      },
      {
        deploymentId: "7",
        releasedId: "4",
        environmentId: "1",
        projectId: "2",
        deployedAt: "7",
      },
      {
        deploymentId: "8",
        releasedId: "4",
        environmentId: "2",
        projectId: "2",
        deployedAt: "8",
      },
    ];
    expect(generateCombineList(mockDeployList, mockReleaseList)).toEqual(
      expectCombineList
    );
  });

  it("----Generate result map should work correctly", () => {
    const mockCombineList: CombinedType[] = [
      {
        deploymentId: "1",
        releasedId: "1",
        environmentId: "1",
        projectId: "1",
        deployedAt: "2020-12-20T10:30:00",
      },
      {
        deploymentId: "2",
        releasedId: "1",
        environmentId: "1",
        projectId: "1",
        deployedAt: "2020-12-20T11:30:00",
      },
      {
        deploymentId: "3",
        releasedId: "1",
        environmentId: "2",
        projectId: "1",
        deployedAt: "2020-12-20T10:35:00",
      },
      {
        deploymentId: "4",
        releasedId: "1",
        environmentId: "2",
        projectId: "1",
        deployedAt: "2020-12-20T11:35:00",
      },
      {
        deploymentId: "5",
        releasedId: "2",
        environmentId: "1",
        projectId: "2",
        deployedAt: "2020-12-20T12:30:00",
      },
      {
        deploymentId: "6",
        releasedId: "2",
        environmentId: "1",
        projectId: "2",
        deployedAt: "2020-12-20T13:30:00",
      },
      {
        deploymentId: "7",
        releasedId: "2",
        environmentId: "2",
        projectId: "2",
        deployedAt: "2020-12-20T12:35:00",
      },
      {
        deploymentId: "8",
        releasedId: "2",
        environmentId: "2",
        projectId: "2",
        deployedAt: "2020-12-20T13:35:00",
      },
    ];

    // key will be 'projectId | releaseId | environmentId'
    const expectMap = new Map<string, string>([
      ["1|1|1", "2020-12-20T11:30:00"],
      ["1|1|2", "2020-12-20T11:35:00"],
      ["2|2|1", "2020-12-20T13:30:00"],
      ["2|2|2", "2020-12-20T13:35:00"],
    ]);

    expect(generateResultMap(mockCombineList)).toEqual(expectMap);
  });

  it("----Generate reuslt print should work correctly", () => {
    const mockMap = new Map<string, string>([
      ["1|1|1", "2020-12-20T11:30:00"],
      ["1|1|2", "2020-12-20T11:35:00"],
      ["2|2|1", "2020-12-20T13:30:00"],
      ["2|2|2", "2020-12-20T13:35:00"],
    ]);

    const expectArr = [
      "'1' kept because it was the most recently deployed to '1'",
      "'1' kept because it was the most recently deployed to '2'",
      "'2' kept because it was the most recently deployed to '1'",
      "'2' kept because it was the most recently deployed to '2'",
    ];

    expect(generateResultPrint(mockMap)).toEqual(expectArr);
  });
});
