import { highlightAll } from '@lib/highlight'
import { Workbench } from '@organisms/Workbench'
import { MotionProvider } from '@providers/MotionProvider'
import { WorkbenchProvider } from '@providers/WorkbenchProvider'

export default async function Home() {
  const tokens = await highlightAll()
  return (
    <MotionProvider>
      <WorkbenchProvider tokens={tokens}>
        <Workbench />
      </WorkbenchProvider>
    </MotionProvider>
  )
}
