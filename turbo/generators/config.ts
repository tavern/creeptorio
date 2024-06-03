import type { PlopTypes } from '@turbo/gen'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('bun', {
    description: 'A bare bun project',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'What type of project should be created?',
        default: 'pkgs',
        choices: [
          { name: 'App', value: 'apps' },
          { name: 'Package', value: 'pkgs' },
        ],
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the project?',
        transformer: (v) => v.toLowerCase(),
        validate: (v) => /^[A-z0-9_-]+$/.test(v) || 'Name should contain only letters, numbers and dashes',
      },
    ],
    actions: [
      {
        type: 'addMany',
        base: 'bun/bare',
        destination: '{{ turbo.paths.root }}/{{ type }}/{{ name }}',
        templateFiles: 'bun/bare/**',
      },
    ],
  })
}
