import { Task } from '../../models/task'
import { Tasks } from '../Tasks'

type TasksProps = {
  tasks: Task[]
}

export const TaskManager = ({ tasks }: TasksProps) => {
  return (
    <>
      <Tasks tasks={tasks} />
    </>
  )
}
