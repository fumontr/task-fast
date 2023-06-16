import { useEffect, useState } from 'react'

import { useStopwatch } from '../../hooks/useStopwatch/useStopwatch'
import { Task } from '../../models/task'

import { Buttons } from './Buttons'
import { DisplayTime } from './DisplayTime'
import { Inbox } from './Inbox'

export const TaskController = ({ ongoingTask }: { ongoingTask: Task | undefined }) => {
  const { isRunning, elapseTime, startStopwatch, stopStopwatch } =
    useStopwatch()
  const hour = Math.floor((elapseTime / (60 * 60)) % 24)
  const minute = Math.floor((elapseTime / 60) % 60)
  const second = elapseTime % 60

  useEffect(() => {
    if (ongoingTask) {
      startStopwatch(ongoingTask.start)
    }
  }, [ongoingTask, startStopwatch])

  const [taskName, setTaskName] = useState<string>(ongoingTask?.name ?? '')

  return (
    <>
      <DisplayTime hours={hour} minutes={minute} seconds={second} />
      <Inbox taskName={taskName} setTaskName={setTaskName} />
      <Buttons
        taskName={taskName}
        setTaskName={setTaskName}
        startStopwatch={startStopwatch}
        stopStopwatch={stopStopwatch}
        isRunning={isRunning}
        ongoingTask={ongoingTask}
      />
    </>
  )
}
