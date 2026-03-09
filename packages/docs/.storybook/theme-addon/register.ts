import { addons, types } from '@storybook/manager-api';
import { ThemeSwitcher } from './ThemeSwitcher';

addons.register('kenikool/theme-switcher', (api) => {
  addons.add('kenikool/theme-switcher/panel', {
    type: types.TOOL,
    title: 'Theme',
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <ThemeSwitcher api={api} />,
  });
});
