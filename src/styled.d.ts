import 'styled-components';
import type { IGardenTheme } from '@zendesk-ui/react-components';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends IGardenTheme {}
}
