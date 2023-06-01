import { Task } from '../../models/task'
import { Inbox } from '../Inbox'
import { Tasks } from '../Tasks'

type TasksProps = {
  doingTaskName: string
  setDoingTaskName: (task: string) => void
  tasks: Task[]
}

export const TaskManager = ({
  doingTaskName,
  setDoingTaskName,
  tasks,
}: TasksProps) => {
  return (
    <>
      <Inbox
        doingTaskName={doingTaskName}
        setDoingTaskName={setDoingTaskName}
      />
      <Tasks tasks={tasks} />
    </>
  )
}
