import { Flex, Text } from '@chakra-ui/react'

type DisplayTimeProps = {
  hours: number
  minutes: number
  seconds: number
}

export const DisplayTime = ({ hours, minutes, seconds }: DisplayTimeProps) => {
  const hourStr = hours.toString().padStart(2, '0')
  const minuteStr = minutes.toString().padStart(2, '0')
  const secondStr = seconds.toString().padStart(2, '0')

  return (
    <Flex pt={{ base: 0, md: 8 }} direction={'row'} alignItems="center">
      <TimeText text={hourStr} />
      <TimeSeparator />
      <TimeText text={minuteStr} />
      <TimeSeparator />
      <TimeText text={secondStr} />
    </Flex>
  )
}

const TimeText = ({ text }: { text: string }) => (
  <Text
    fontSize={{ base: '6xl', md: '120px' }}
    w={{ base: '80%', md: '180px' }}
    textAlign="center"
    fontFamily="Roboto Mono"
  >
    {text}
  </Text>
)

const TimeSeparator = () => (
  <Text fontSize={{ base: '6xl', md: '120px' }}>:</Text>
)
