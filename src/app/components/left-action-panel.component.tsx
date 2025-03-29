import { Tabs } from '@radix-ui/themes';
import { useState } from 'react';
import { CreateProperty } from './create-property.component';
import { CreateUserForm } from './create-user-form.component';

export function LeftActionPanel() {
  const [panel, setPanel] = useState('properties');

  return (
    <Tabs.Root
      defaultValue={panel}
      onValueChange={setPanel}
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
