import { Tasks } from '../Tasks'
import { Task } from '../../models/task'
import { Inbox } from '../Inbox'

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
