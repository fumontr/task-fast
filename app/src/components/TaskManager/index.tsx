import { Task } from '../../models/task'
import { Tasks } from '../Tasks'

type TasksProps = {
  tasks: Task[] | undefined
}

export const TaskManager = ({ tasks }: TasksProps) => {
  return (
    <>
      <Tasks tasks={tasks} />
    </>
  )
}
