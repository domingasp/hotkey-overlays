import { ActionIcon, ActionIconProps, Menu } from '@mantine/core';
import { Clock, MoreHorizontal, Trash } from 'react-feather';
import { notifications } from '@mantine/notifications';

interface ActionsMenuProps extends ActionIconProps {
  onAutoTurnOff: () => void;
  onDelete: () => void;
}
function ActionsMenu({
  onAutoTurnOff,
  onDelete,
  pos,
  top,
  right,
}: ActionsMenuProps) {
  return (
    <Menu withinPortal position="left" shadow="sm" withArrow>
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
          leftSection={<Clock size={12} />}
          style={{ fontSize: '0.8rem' }}
          onClick={() => {
            onAutoTurnOff();
          }}
        >
          Auto Turn Off
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={<Trash size={12} />}
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

export default ActionsMenu;
