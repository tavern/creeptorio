import { Select } from '@kobalte/core/select'
import { actions } from 'astro:actions'
import Cookies from 'js-cookie'
import { createSignal, onCleanup, onMount, type JSX } from 'solid-js'
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

const darkModeOptions = [
  { label: 'System', value: 'system', icon: (props: JSX.HTMLAttributes<HTMLElement>) => <span {...props}>💻</span> },
  { label: 'Light', value: 'light', icon: (props: JSX.HTMLAttributes<HTMLElement>) => <span {...props}>☀️</span> },
  { label: 'Dark', value: 'dark', icon: (props: JSX.HTMLAttributes<HTMLElement>) => <span {...props}>🌙</span> },
] as const

type DarkModeOption = (typeof darkModeOptions)[number]

type DarkModeToggleProps = {
  initialTheme?: ThemeChoice
}
export const DarkModeToggle = ({ initialTheme = 'system' }: DarkModeToggleProps = {}) => {
  onMount(() => {
    setSelectedTheme(initialTheme)
    prefersDark?.addEventListener('change', changeHandler)
  })
  onCleanup(() => {
    prefersDark?.removeEventListener('change', changeHandler)
  })

  return (
    <Select
      defaultValue={darkModeOptions.find((option) => option.value === initialTheme) as DarkModeOption}
      options={[...darkModeOptions]}
      optionValue="value"
      optionTextValue="label"
      onChange={(value) => {
        actions.toggleDarkMode(value.value)
        selectTheme(value.value)
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
