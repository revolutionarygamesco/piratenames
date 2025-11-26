import { MODULE_ID } from './settings.ts'
import { localize } from './wrapper.ts'

const whisperMessage = async (
  recipients: string[],
  flavor: string,
  content: string
): Promise<void> => {
  await foundry.documents.ChatMessage.create({
    speaker: { alias: localize(`${MODULE_ID}.message.speaker`) },
    flavor,
    content,
    whisper: recipients
  })
}

export default whisperMessage
