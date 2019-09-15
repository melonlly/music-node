import { AwilixContainer } from "awilix";

export interface Global extends NodeJS.Global {
	container: AwilixContainer
}

declare var global: Global