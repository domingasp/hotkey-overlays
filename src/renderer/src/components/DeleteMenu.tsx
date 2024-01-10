import { ActionIcon, ActionIconProps, Menu, rem } from '@mantine/core';
import { IconDots, IconTrash } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface DeleteMenuProps extends ActionIconProps {
  onDelete: () => void;
}
function DeleteMenu({ onDelete, pos, top, right }: DeleteMenuProps) {
  return (
    <Menu withinPortal position="left" shadow="sm">
      <Menu.Target>
        <ActionIcon
          variant="subtle"
          color="gray"
          pos={pos}
          right={right}
          top={top}
        >
          <IconDots style={{ width: rem(14), height: rem(14) }} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          color="red"
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
          style={{ fontSize: '0.8rem' }}
          onClick={() => {
            notifications.clean();
            notifications.show({
              color: 'red',
              message: `Deleted overlay`,
              withCloseButton: false,
              icon: <IconTrash style={{ width: rem(14), height: rem(14) }} />,
            });
            onDelete();
          }}
        >
          Delete Overlay
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default DeleteMenu;
