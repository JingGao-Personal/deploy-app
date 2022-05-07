export type Environment = {
  Id: string;
  Name: string;
};

export type Deployment = {
  Id: string;
  ReleasedId: string;
  EnvironmentId: string;
  DeployedAt: string;
};

export type Project = {
  Id: string;
  Name: string;
};

export type Release = {
  Id: string;
  ProjectId: string;
  Version: string;
  CreatedAt: string;
};

export type CombinedType = {
  projectId: string;
  releasedId: string;
  environmentId: string;
  deploymentId: string;
  deployedAt: string;
};
