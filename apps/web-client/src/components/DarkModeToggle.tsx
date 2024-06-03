import { actions } from 'astro:actions'
import Cookies from 'js-cookie'
import { createSignal, onCleanup, onMount } from 'solid-js'
import type { Theme, ThemeChoice } from '~/constants'

const prefersDark: MediaQueryList | null = globalThis.matchMedia?.('(prefers-color-scheme: dark)')

const [selectedTheme, setSelectedTheme] = createSignal<ThemeChoice>('system')

const selectTheme = async (theme?: ThemeChoice) => {
  setSelectedTheme(theme ?? 'system')

  const isDark = theme === 'dark' || ((!theme || theme === 'system') && prefersDark.matches)

  if (isDark) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
}

const changeHandler = () => {
  selectTheme(Cookies.get('theme') as Theme)
}

type DarkModeToggleProps = {
  initialTheme?: ThemeChoice
}
export const DarkModeToggle = ({ initialTheme = 'system' }: DarkModeToggleProps = {}) => {
  console.log('initialTheme', initialTheme)
  onMount(() => {
    setSelectedTheme(initialTheme)
    prefersDark?.addEventListener('change', changeHandler)
  })
  onCleanup(() => {
    prefersDark?.removeEventListener('change', changeHandler)
  })

  return (
    <select
      onChange={(e) => {
        actions.toggleDarkMode(e.target.value as ThemeChoice)
        selectTheme(e.target.value as ThemeChoice)
      }}
    >
      <option value="system" selected={selectedTheme() === 'system'}>
        System
      </option>
      <option value="light" selected={selectedTheme() === 'light'}>
        Light
      </option>
      <option value="dark" selected={selectedTheme() === 'dark'}>
        Dark
      </option>
    </select>
  )
}
