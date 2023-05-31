import { DisplayTime } from './DisplayTime'
import { Buttons } from './Buttons'
import { Task } from '../../models/task'

type StopwatchProps = {
  elapseTime: number
  doingTaskName: string
  setDoingTaskName: (name: string) => void
  startStopwatch: (name: string) => void
  stopStopwatch: () => void
  isRunning: boolean
  setTasks: (value: Task[] | ((prevValue: Task[]) => Task[])) => void
  tasks: Task[]
}

export const Stopwatch = ({
  isRunning,
  elapseTime,
  startStopwatch,
  stopStopwatch,
  doingTaskName,
  setDoingTaskName,
  tasks,
  setTasks,
}: StopwatchProps) => {
  const hour = Math.floor((elapseTime / (60 * 60)) % 24)
  const minute = Math.floor((elapseTime / 60) % 60)
  const second = elapseTime % 60

  return (
    <>
      <DisplayTime hours={hour} minutes={minute} seconds={second} />
      <Buttons
        doingTaskName={doingTaskName}
        setDoingTaskName={setDoingTaskName}
        startStopwatch={startStopwatch}
        stopStopwatch={stopStopwatch}
        isRunning={isRunning}
        setTasks={setTasks}
        tasks={tasks}
      />
    </>
  )
}
