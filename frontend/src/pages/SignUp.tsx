import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import { IoIosLogIn } from "react-icons/io";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to chat page
  useEffect(() => {
    if (auth?.user) {
      return () => navigate("/chat");
    }
  }, [auth, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("SignUp in...", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signing Up successfully", { id: "signup" });
      navigate("/chat");
    } catch (error) {
      console.error(error);
      toast.error("Signing Up failed", { id: "signup" });
    }
  };

  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
      <Box mt={8} p={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
      </Box>
      <Box
        p={2}
        mt={16}
        ml={"auto"}
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography p={2} variant="h4" textAlign="center" fontWeight={600}>
              SignUP
            </Typography>
            <CustomizedInput name="name" type="text" label="Name" />
            <CustomizedInput name="email" type="email" label="Email" />
            <CustomizedInput name="password" type="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 1,
                width: "400px",
                borderRadius: 2,
                backgroundColor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Sign Up
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
