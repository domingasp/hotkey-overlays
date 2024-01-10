import { ActionIcon, ActionIconProps, Menu } from '@mantine/core';
import { MoreHorizontal, Trash } from 'react-feather';
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
          <MoreHorizontal size={14} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          color="red"
          leftSection={<Trash size={14} />}
          style={{ fontSize: '0.8rem' }}
          onClick={() => {
            notifications.clean();
            notifications.show({
              color: 'red',
              message: `Deleted overlay`,
              withCloseButton: false,
              icon: <Trash size={14} />,
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
