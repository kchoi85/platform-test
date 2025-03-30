import { Tabs } from '@radix-ui/themes';
import { CreateProperty } from './create-property.component';
import { CreateUserForm } from './create-user-form.component';

interface LeftActionPanelProps {
  panel: 'properties' | 'users';
  onHandlePanel: (panel: 'properties' | 'users') => void;
}

export function LeftActionPanel({
  panel,
  onHandlePanel,
}: LeftActionPanelProps) {
  return (
    <Tabs.Root
      defaultValue={panel}
      // @ts-ignore
      onValueChange={onHandlePanel}
      className="shadow-lg rounded-lg bg-white border border-gray-300 h-full"
    >
      <Tabs.List
        className="bg-gray-100 rounded-t-lg pt-1"
        justify="center"
        color="crimson"
      >
        <Tabs.Trigger value="properties">Properties</Tabs.Trigger>
        <Tabs.Trigger value="users">Users</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="properties">
        <CreateProperty />
      </Tabs.Content>
      <Tabs.Content value="users">
        <CreateUserForm />
      </Tabs.Content>
    </Tabs.Root>
  );
}
