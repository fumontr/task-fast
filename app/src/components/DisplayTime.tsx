import { Flex, Text } from '@chakra-ui/react'

type DisplayTimeProps = {
  hour: number
  minute: number
  second: number
}

export const DisplayTime = ({ hour, minute, second }: DisplayTimeProps) => {
  const hourStr = hour.toString().padStart(2, '0')
  const minuteStr = minute.toString().padStart(2, '0')
  const secondStr = second.toString().padStart(2, '0')

  return (
    <Flex pt={{ base: 0, md: 10 }} direction={'row'} alignItems="center">
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
    color="white"
    w={{ base: '80%', md: '180px' }}
    textAlign="center"
    fontFamily="Roboto Mono"
  >
    {text}
  </Text>
)

const TimeSeparator = () => (
  <Text fontSize={{ base: '6xl', md: '120px' }} color="white">
    :
  </Text>
)
