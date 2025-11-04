import type { Entry } from "./Entry";

export interface Routine {
  id: number;
  name: string;
  entries: Entry[];
  checked: boolean;
}