import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
  EyeOpenIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  Badge,
  Card,
  Flex,
  IconButton,
  Table,
  Theme,
  Text,
  Avatar,
  Box,
  Popover,
  Dialog,
  Strong,
  Separator,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { userStore } from "../store/userStore.js";
import ModalInfo from "./ModalInfo.tsx";
import "./ListItem.css";

const DialogInfo = ({ user }: object) => {
  const getUserDescriptionStore = userStore(
    (state) => state.getUserDescription
  );
  const [userDescription, setUserDescription] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(user).length !== 0) {
        const res = await getUserDescriptionStore(user.id);
        setUserDescription(res.data.data);
      }
    };

    fetchData();
  }, [user]);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton size="1" variant="soft" color="gray">
          <EyeOpenIcon height="16" width="16" color="white" />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content size="2" style={{ color: userDescription.color }}>
        <Dialog.Title>{user.full_name}</Dialog.Title>
        <Dialog.Description />
        <Flex direction="column">
          <Text as="div" size="2">
            Year of birth: <Strong>{userDescription.year}</Strong>
          </Text>
          <Separator size="4" style={{ background: userDescription.color }} />
          <Text as="div" size="2">
            Color: <Strong>{userDescription.color}</Strong>
          </Text>
          <Separator size="4" style={{ background: userDescription.color }} />
          <Text as="div" size="2">
            Color name: <Strong>{userDescription.name}</Strong>
          </Text>
          <Separator size="4" style={{ background: userDescription.color }} />
          <Text as="div" size="2">
            Pantone value: <Strong>{userDescription.pantone_value}</Strong>
          </Text>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

const ListItemPage = () => {
  const getUsersStore = userStore((state) => state.getUsers);
  const [usersData, setUsersData] = useState([]);
  const [pagesData, setPagesData] = useState({ page: 1 });
  const [modelData, setModelData] = useState({ isShow: false, userInfo: {} });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUsersStore(pagesData.page);
      const arr = res.data.data.map((item: object) => {
        item.full_name = `${item.first_name} ${item.last_name}`;
        return item;
      });
      setUsersData(arr);
      setPagesData({
        page: res.data.page,
        per_page: res.data.per_page,
        total: res.data.total,
        total_pages: res.data.total_pages,
      });
    };

    fetchData();
  }, [pagesData.page]);

  const goNextPage = () => {
    setPagesData({ ...pagesData, page: pagesData.page + 1 });
  };
  const goPrevPage = () => {
    setPagesData({ ...pagesData, page: pagesData.page - 1 });
    // const res = getUsersStore(pagesData.page);
    // const arr = res.data.data.map((item: object) => {
    //   item.full_name = `${item.first_name} ${item.last_name}`;
    //   return item;
    // });
    // setUsersData(arr);
    // setPagesData({
    //   page: res.data.page,
    //   per_page: res.data.per_page,
    //   total: res.data.total,
    //   total_pages: res.data.total_pages,
    // });
  };
  const openModel = (id: string) => {
    const tmp = usersData.find((item) => item.id == id);
    setModelData({
      isShow: true,
      userInfo: tmp,
    });
    const searchIndex = usersData.findIndex((item) => item.id == id);
    usersData.splice(searchIndex, 1, {});
  };
  return (
    <Box width="700px">
      <Card>
        <Table.Root variant="surface" size="3">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell justify="start">
                Avatar
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify="start">
                Full name
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify="center" width="100px">
                Email
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify="end">id</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {usersData.map((user, index) => (
              <Table.Row key={index} align="center">
                <Table.Cell>
                  <Avatar radius="full" src={user?.avatar} fallback="" />
                </Table.Cell>
                <Table.Cell justify="start">{user?.full_name}</Table.Cell>
                <Table.Cell justify="center">{user?.email}</Table.Cell>
                <Table.Cell justify="end">{user?.id}</Table.Cell>
                <Table.Cell>
                  {user?.id ? (
                    <Popover.Root>
                      <Popover.Trigger>
                        <IconButton size="1" variant="soft" color="gray">
                          <DotsHorizontalIcon
                            height="16"
                            width="16"
                            color="gray"
                          />
                        </IconButton>
                      </Popover.Trigger>
                      <Popover.Content>
                        <Flex gap="3">
                          <DialogInfo user={user} />
                          <IconButton
                            size="1"
                            variant="soft"
                            color="tomato"
                            onClick={() => openModel(user?.id)}
                          >
                            <TrashIcon height="16" width="16" color="red" />
                          </IconButton>
                        </Flex>
                      </Popover.Content>
                    </Popover.Root>
                  ) : null}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>
                <Flex align="center" gap="2">
                  <Flex align="center" gap="2">
                    <Badge color="green" variant="outline">
                      {pagesData.page}
                    </Badge>
                    <Text align="center" as="p" size="2" weight="regular">
                      from
                    </Text>
                  </Flex>
                  <Badge color="blue" variant="outline">
                    {pagesData.total_pages}
                  </Badge>
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell />
              <Table.ColumnHeaderCell />
              <Table.ColumnHeaderCell />
              <Table.ColumnHeaderCell style={{ position: "relative" }}>
                <Theme
                  accentColor="indigo"
                  style={{ position: "absolute", right: "25px" }}
                >
                  <Flex gap="3" justify="center">
                    <IconButton
                      size="1"
                      variant="outline"
                      disabled={pagesData.page === 1}
                      onClick={goPrevPage}
                    >
                      <ChevronLeftIcon height="16" width="16" color="gray" />
                    </IconButton>
                    <IconButton
                      size="1"
                      variant="outline"
                      disabled={pagesData.page === pagesData.total_pages}
                      onClick={goNextPage}
                    >
                      <ChevronRightIcon height="16" width="16" color="gray" />
                    </IconButton>
                  </Flex>
                </Theme>
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
        </Table.Root>
      </Card>
      <ModalInfo propOpen={modelData} />
    </Box>
  );
};

export default ListItemPage;
