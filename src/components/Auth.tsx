import { useState, useEffect } from "react";
import "@radix-ui/themes/styles.css";
import {
  Theme,
  Flex,
  Button,
  Box,
  Card,
  Text,
  Badge,
  Strong,
  TextField,
  IconButton,
} from "@radix-ui/themes";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import {
  usePostLoginMutation,
  usePostRegistMutation,
} from "../hooks/userHooks";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isShowPasswd, setIsShowPasswd] = useState(false);

  const [userData, setUserData] = useState({
    email: "eve.holt@reqres.in",
    password: "зшыещд",
  });
  const setEmail = (val: string) => {
    setUserData({ ...userData, email: val });
  };
  const setPasswd = (val: string) => {
    setUserData({ ...userData, password: val });
  };

  const [isValidData, setIsValidData] = useState(false);
  useEffect(() => {
    setIsValidData(userData.email !== "" && userData.password !== "");
  }, [userData]);

  const [statusResponse, setStatusResponse] = useState({
    code: null,
    msg: "",
  });

  const saveAndRedirect = (token: string) => {
    localStorage.setItem("token", token);
    navigate("/list");
  };

  const mutationLogin = usePostLoginMutation(
    (data: object) => {
      setStatusResponse({
        code: data.status,
        msg: "",
      });
      saveAndRedirect(data.data.token);
    },
    (err: object) => {
      setStatusResponse({
        code: err.status,
        msg: err.data.error,
      });
    }
  );
  const sendLogin = () => {
    setIsValidData(false);
    mutationLogin.mutate(userData);
  };

  const mutationRegist = usePostRegistMutation(
    (data: object) => {
      setStatusResponse({
        code: data.status,
        msg: "",
      });
      saveAndRedirect(data.data.token);
    },
    (err: object) => {
      setStatusResponse({
        code: err.status,
        msg: err.data.error,
      });
    }
  );
  const sendRegist = () => {
    setIsValidData(false);
    mutationRegist.mutate(userData);
  };

  return (
    <Theme accentColor="green" grayColor="sand" appearance="dark">
      <Flex align="center" justify="center" height="100vh">
        <Box width="300px">
          <Card size="2">
            <Flex direction="column" gap="5">
              <Text align="center" as="div">
                <Strong>To.do</Strong> list
              </Text>
              <Flex direction="column" gap="3">
                <TextField.Root
                  placeholder="Email"
                  value={userData.email}
                  onChange={(event) => setEmail(event.target.value)}
                >
                  <TextField.Slot />
                </TextField.Root>
                <TextField.Root
                  type={isShowPasswd ? "text" : "password"}
                  placeholder="Password"
                  value={userData.password}
                  onChange={(event) => setPasswd(event.target.value)}
                >
                  <TextField.Slot />
                  <TextField.Slot>
                    <IconButton
                      size="1"
                      variant="ghost"
                      onClick={() => setIsShowPasswd(!isShowPasswd)}
                    >
                      {isShowPasswd ? (
                        <EyeOpenIcon height="16" width="16" color="gray" />
                      ) : (
                        <EyeClosedIcon height="16" width="16" color="gray" />
                      )}
                    </IconButton>
                  </TextField.Slot>
                </TextField.Root>
              </Flex>
              <Flex justify="between" align="center">
                <Button
                  disabled={!isValidData}
                  loading={mutationLogin.isPending || mutationRegist.isPending}
                  onClick={sendLogin}
                >
                  Login
                </Button>
                <Text>OR</Text>
                <Button
                  variant="outline"
                  disabled={!isValidData}
                  loading={mutationLogin.isPending || mutationRegist.isPending}
                  onClick={sendRegist}
                >
                  Register
                </Button>
              </Flex>
            </Flex>
          </Card>
          {statusResponse.code !== null ? (
            <Flex wrap="wrap" gap="1" py="2" justify="center">
              <Badge color={statusResponse.code < 300 ? "green" : "red"}>
                {statusResponse.code}
              </Badge>
              {statusResponse.msg !== "" ? (
                <Badge color="blue">{statusResponse.msg}</Badge>
              ) : null}
            </Flex>
          ) : null}
        </Box>
      </Flex>
    </Theme>
  );
};

export default AuthPage;
