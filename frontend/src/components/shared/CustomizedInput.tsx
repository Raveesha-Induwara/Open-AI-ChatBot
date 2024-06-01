import { TextField } from "@mui/material";

type Props = {
  name: string;
  type: string;
  label: string;
};
const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{style: {color: "white"}}}
      InputProps={{style: {width: "400px", borderRadius: "10px", color: "white"}}}
      name={props.name}
      label={props.label}
      type={props.type}
    ></TextField>
  );
};

export default CustomizedInput;
