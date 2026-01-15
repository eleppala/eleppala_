import { useState, useEffect, useRef } from 'react'

interface TerminalLine {
  type: 'command' | 'response'
  text: string
}

interface TerminalProps {
  onTypingComplete?: () => void
  isTyping?: boolean
}

type Phase = 'intro-whoami' | 'intro-whoami-done' | 'intro-help' | 'intro-help-done' | 'interactive'

function Terminal({ onTypingComplete, isTyping = true }: TerminalProps) {
  const [phase, setPhase] = useState<Phase>('intro-whoami')
  const [introCommandText, setIntroCommandText] = useState('')
  const [history, setHistory] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const whoamiCommand = 'whoami'
  const whoamiResponse = 'Eemeli Leppälä - A software Developer'
  const helpCommand = 'help'
  const helpResponse = 'Available commands: help, whoami, clear, ls, cd'

  // Phase 1: Type "whoami"
  useEffect(() => {
    if (!isTyping || phase !== 'intro-whoami') return

    let index = 0
    const interval = setInterval(() => {
      if (index < whoamiCommand.length) {
        setIntroCommandText(whoamiCommand.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setPhase('intro-whoami-done')
      }
    }, 80)

    return () => clearInterval(interval)
  }, [isTyping, phase])

  // Phase 2: Wait, show whoami response, then start typing help
  useEffect(() => {
    if (phase !== 'intro-whoami-done') return

    const timer = setTimeout(() => {
      setHistory([
        { type: 'command', text: whoamiCommand },
        { type: 'response', text: whoamiResponse },
      ])
      setIntroCommandText('')
      setPhase('intro-help')
    }, 400)

    return () => clearTimeout(timer)
  }, [phase])

  // Phase 3: Type "help"
  useEffect(() => {
    if (phase !== 'intro-help') return

    let index = 0
    const interval = setInterval(() => {
      if (index < helpCommand.length) {
        setIntroCommandText(helpCommand.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setPhase('intro-help-done')
      }
    }, 80)

    return () => clearInterval(interval)
  }, [phase])

  // Phase 4: Wait, show help response, become interactive
  useEffect(() => {
    if (phase !== 'intro-help-done') return

    const timer = setTimeout(() => {
      setHistory(prev => [
        ...prev,
        { type: 'command', text: helpCommand },
        { type: 'response', text: helpResponse },
      ])
      setIntroCommandText('')
      setPhase('interactive')
      onTypingComplete?.()
    }, 400)

    return () => clearTimeout(timer)
  }, [phase, onTypingComplete])

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Focus input when clicking terminal
  const handleTerminalClick = () => {
    if (phase === 'interactive') {
      inputRef.current?.focus()
    }
  }

  // Handle command execution
  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    let response = ''

    switch (trimmedCmd) {
      case 'help':
        response = helpResponse
        break
      case 'whoami':
        response = whoamiResponse
        break
      case 'clear':
        setHistory([])
        setCurrentInput('')
        return
      case 'ls':
        response = 'projects/  about.txt  contact.txt'
        break
      case 'cd':
        response = 'Usage: cd <directory>'
        break
      case '':
        setHistory(prev => [...prev, { type: 'command', text: '' }])
        setCurrentInput('')
        return
      default:
        response = `command not found: ${trimmedCmd}`
    }

    setHistory(prev => [
      ...prev,
      { type: 'command', text: cmd },
      { type: 'response', text: response },
    ])
    setCurrentInput('')
  }

  // Handle keyboard input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput)
    }
  }

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const cursorVisible = showCursor ? 'opacity-100' : 'opacity-0'
  const isIntroPhase = phase.startsWith('intro')

  return (
    <div
      className="w-[calc(100vw-2rem)] sm:w-[420px] md:w-[500px] lg:w-[600px] h-[200px] sm:h-[250px] md:h-[280px] bg-gray-900 rounded-lg shadow-2xl overflow-hidden cursor-text mx-4 border-[0.5px] border-gray-700"
      onClick={handleTerminalClick}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-black">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-gray-400 text-xs font-mono">eleppala/ -- -zsh -- </span>
      </div>

      {/* Terminal body */}
      <div
        ref={terminalRef}
        className="p-3 font-mono text-green-400 text-xs sm:text-sm h-[calc(100%-44px)] overflow-y-auto text-left space-y-1 dark-scrollbar"
      >
        {/* History lines */}
        {history.map((line, index) => (
          <div key={index}>
            {line.type === 'command' ? (
              <>
                <span className="text-gray-500">$ </span>
                <span>{line.text}</span>
              </>
            ) : (
              <span>{line.text}</span>
            )}
          </div>
        ))}

        {/* Current typing line during intro */}
        {isIntroPhase && (
          <div>
            <span className="text-gray-500">$ </span>
            <span>{introCommandText}</span>
            <span className={`${cursorVisible} transition-opacity`}>▋</span>
          </div>
        )}

        {/* Interactive input line */}
        {phase === 'interactive' && (
          <div className="flex">
            <span className="text-gray-500">$ </span>
            <span>{currentInput}</span>
            <span className={`${cursorVisible} transition-opacity`}>▋</span>
            {/* Hidden input for capturing keyboard */}
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={e => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="absolute opacity-0 pointer-events-none"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Terminal
