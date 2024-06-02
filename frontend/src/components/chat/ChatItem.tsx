import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Extract code blocks from a string
function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlocks(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("(") ||
    str.includes(")") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

const ChatItem = ({ content, role }: { content: string; role: string }) => {
  const messageBlocks = extractCodeFromString(content) as string[] | undefined;
  const auth = useAuth();

  return role === "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", gap: 2, my: 2 }}>
      <Avatar>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      {/* Message Container */}
      <Box>
        {!messageBlocks && <Typography fontSize={"20px"}>{content}</Typography>}

        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) => {
            return isCodeBlocks(block) ? (
              <SyntaxHighlighter language="javascript" style={coldarkDark}>
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography fontSize={"20px"}>{block}</Typography>
            );
          })}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2, mb: 1 }}>
      <Avatar
        sx={{
          ml: 0,
          bgcolor: "black",
          color: "white",
        }}
      >
        {auth?.user?.name[0]}
        {auth?.user?.name.split("")[1][0].toUpperCase()}
      </Avatar>
      {/* Message Container */}
      <Box>
        {!messageBlocks && <Typography fontSize={"20px"}>{content}</Typography>}

        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) => {
            return isCodeBlocks(block) ? (
              <SyntaxHighlighter language="javascript" style={coldarkDark}>
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography fontSize={"20px"}>{block}</Typography>
            );
          })}
      </Box>
    </Box>
  );
};

export default ChatItem;
