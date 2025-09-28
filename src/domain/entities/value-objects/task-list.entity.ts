export class TaskListEntity {
  private assignName: string;
  private function?: string;

  constructor(props: { assignName: string; function: string }) {
    this.assignName = props.assignName;
    this.function = props.function;
  }

  // Getters
  getTaskAssignName(): string {
    return this.assignName;
  }

  getFunction(): string | undefined {
    return this.function;
  }
}
