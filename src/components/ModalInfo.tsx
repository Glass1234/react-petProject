import * as Toast from "@radix-ui/react-toast";
import * as React from "react";
import "./ModalInfo.css";
import { Card, Flex, Strong } from "@radix-ui/themes";
import { PersonIcon } from "@radix-ui/react-icons";

const ModalInfo = ({ propOpen }: boolean) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (propOpen.isShow) {
      setOpen(propOpen.isShow);
    }
  }, [propOpen]);

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root open={open} onOpenChange={setOpen}>
        <Card>
          <Flex justify="center">
            <Toast.Title>
              <Flex align="center" gap="1">
                <PersonIcon width="18" height="18" color="yellow" />{" "}
                <div>
                  <Strong>{propOpen.userInfo.full_name}</Strong> delete from id
                  = <Strong>{propOpen.userInfo.id}</Strong>
                </div>
              </Flex>
            </Toast.Title>
          </Flex>
        </Card>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};
export default ModalInfo;
