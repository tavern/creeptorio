import { Select } from '@kobalte/core/select'
import { actions } from 'astro:actions'
import Cookies from 'js-cookie'
import { createSignal, onCleanup, type JSX } from 'solid-js'
import type { Theme, ThemeChoice } from '~/constants'

const prefersDark: MediaQueryList | null = globalThis.matchMedia?.('(prefers-color-scheme: dark)')

const selectTheme = async (theme?: ThemeChoice) => {
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

const darkModeOptions = {
  system: {
    label: 'System',
    value: 'system',
    icon: (props: JSX.HTMLAttributes<HTMLElement>) => <span {...props}>💻</span>,
  },
  light: {
    label: 'Light',
    value: 'light',
    icon: (props: JSX.HTMLAttributes<HTMLElement>) => <span {...props}>☀️</span>,
  },
  dark: { label: 'Dark', value: 'dark', icon: (props: JSX.HTMLAttributes<HTMLElement>) => <span {...props}>🌙</span> },
} as const

type DarkModeOption = (typeof darkModeOptions)[keyof typeof darkModeOptions]

const [selectedTheme, setSelectedTheme] = createSignal<DarkModeOption>(darkModeOptions.system)

type DarkModeToggleProps = {
  initialTheme?: ThemeChoice
}
export const DarkModeToggle = ({ initialTheme }: DarkModeToggleProps = {}) => {
  const currentTheme = () => darkModeOptions[initialTheme ?? (Cookies.get('theme') as Theme) ?? 'system']
  setSelectedTheme(currentTheme())
  prefersDark?.addEventListener('change', changeHandler)

  onCleanup(() => {
    prefersDark?.removeEventListener('change', changeHandler)
  })

  return (
    <Select
      value={selectedTheme()}
      options={Object.values(darkModeOptions)}
      optionValue="value"
      optionTextValue="label"
      onChange={(change) => {
        actions.selectTheme(change.value)
        setSelectedTheme(change)
        selectTheme(change.value)
      }}
      itemComponent={(props) => {
        const Icon = props.item.rawValue.icon
        return (
          <Select.Item item={props.item}>
            <Icon class="mr-2" />
            {props.item.rawValue.label}
          </Select.Item>
        )
      }}
    >
      <Select.Trigger aria-label="Dark mode">
        <Select.Value<DarkModeOption>>
          {(state) => {
            const Icon = state.selectedOption().icon
            return (
              <>
                <Icon class="mr-2" />
                {state.selectedOption().label}
              </>
            )
          }}
        </Select.Value>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.Listbox />
        </Select.Content>
      </Select.Portal>
    </Select>
  )
}
